'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, AlertCircle } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  title?: string;
  maxPlays?: number;
  onPlayComplete?: () => void;
}

export default function AudioPlayer({
  src,
  title = 'Audio Percakapan Choukai (聴解)',
  maxPlays = 2,
  onPlayComplete,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      const newCount = playCount + 1;
      setPlayCount(newCount);
      if (onPlayComplete) onPlayComplete();
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playCount, onPlayComplete]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (playCount >= maxPlays) return;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.error('Audio play error:', e);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const remainingPlays = Math.max(0, maxPlays - playCount);
  const isLimitReached = remainingPlays === 0 && !isPlaying;

  return (
    <div className="bg-slate-900 text-white rounded-xl p-4 shadow-lg border border-slate-800 my-4 max-w-xl">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            {title}
          </span>
        </div>
        <div className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          Sisa Pemutaran: <strong className="text-white">{remainingPlays}x</strong>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Play / Pause button */}
        <button
          type="button"
          onClick={togglePlay}
          disabled={isLimitReached}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md ${
            isLimitReached
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : isPlaying
              ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
              : 'bg-maroon-700 hover:bg-maroon-600 text-white'
          }`}
          title={isLimitReached ? 'Batas pemutaran audio telah habis' : isPlaying ? 'Jeda' : 'Putar Audio'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        {/* Progress bar */}
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            disabled={isLimitReached}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume button */}
        <button
          type="button"
          onClick={toggleMute}
          className="p-2 text-slate-400 hover:text-white transition-colors"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {isLimitReached && (
        <div className="mt-2 text-[11px] text-amber-300/90 flex items-center gap-1.5 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-800/40">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Batas pemutaran audio ({maxPlays} kali) telah tercapai sesuai standar ujian JLPT.</span>
        </div>
      )}
    </div>
  );
}
