import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password, tier = 'FREE', targetLevel = 'N5', lpkName } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Nama, email, dan kata sandi wajib diisi' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar. Silakan gunakan email lain atau langsung masuk.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: tier === 'LPK_PARTNER' ? 'LPK_ADMIN' : 'STUDENT',
        tier: tier || 'FREE',
        targetLevel: targetLevel || 'N5',
        lpkName: lpkName || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Pendaftaran berhasil',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tier: user.tier,
        targetLevel: user.targetLevel,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal mendaftar pengguna' },
      { status: 500 }
    );
  }
}
