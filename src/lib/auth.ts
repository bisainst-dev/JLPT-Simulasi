import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        impersonateUserId: { label: 'Impersonate User ID', type: 'text' },
        adminTokenSecret: { label: 'Admin Token Secret', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Impersonation Login Path
        if (credentials.impersonateUserId && credentials.adminTokenSecret === process.env.NEXTAUTH_SECRET) {
          const targetUser = await prisma.user.findUnique({
            where: { id: credentials.impersonateUserId },
          });
          if (!targetUser) return null;

          return {
            id: targetUser.id,
            name: targetUser.name,
            email: targetUser.email,
            role: targetUser.role,
            tier: targetUser.tier,
            targetLevel: targetUser.targetLevel || 'N5',
            lpkName: targetUser.lpkName,
            isImpersonated: true,
          } as any;
        }

        // Standard Login Path
        if (!credentials.email || !credentials.password) {
          throw new Error('Email dan kata sandi wajib diisi');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        });

        if (!user) {
          throw new Error('Pengguna tidak ditemukan dengan email tersebut');
        }

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error('Kata sandi yang Anda masukkan salah');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          tier: user.tier,
          targetLevel: user.targetLevel || 'N5',
          lpkName: user.lpkName,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.tier = (user as any).tier;
        token.targetLevel = (user as any).targetLevel || 'N5';
        token.lpkName = (user as any).lpkName;
        token.isImpersonated = (user as any).isImpersonated || false;
      }

      // Handle session updates (e.g. impersonation switch or targetLevel switch)
      if (trigger === 'update' && session) {
        if (session.user) {
          token.id = session.user.id ?? token.id;
          token.name = session.user.name ?? token.name;
          token.email = session.user.email ?? token.email;
          token.role = session.user.role ?? token.role;
          token.tier = session.user.tier ?? token.tier;
          token.targetLevel = session.user.targetLevel ?? token.targetLevel;
          token.lpkName = session.user.lpkName ?? token.lpkName;
          token.isImpersonated = session.user.isImpersonated ?? token.isImpersonated;
          token.impersonatorAdmin = session.user.impersonatorAdmin ?? token.impersonatorAdmin;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).tier = token.tier;
        (session.user as any).targetLevel = token.targetLevel || 'N5';
        (session.user as any).lpkName = token.lpkName;
        (session.user as any).isImpersonated = token.isImpersonated;
        (session.user as any).impersonatorAdmin = token.impersonatorAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
