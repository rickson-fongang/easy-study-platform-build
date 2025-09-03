"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react"

interface VideoPlayerProps {
  videoId: string
  title: string
  duration: string
  onProgress?: (progress: number) => void
  onComplete?: () => void
  timeRemaining?: number // seconds until access expires
}

export function VideoPlayer({ videoId, title, duration, onProgress, onComplete, timeRemaining }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      const progress = (video.currentTime / video.duration) * 100
      onProgress?.(progress)
    }

    const handleLoadedMetadata = () => {
      setTotalDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onComplete?.()
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleEnded)
    }
  }, [onProgress, onComplete])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * totalDuration
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const skipTime = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, totalDuration))
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const formatTimeRemaining = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const mins = Math.floor((seconds % 3600) / 60)

    if (days > 0) return `${days}d ${hours}h remaining`
    if (hours > 0) return `${hours}h ${mins}m remaining`
    return `${mins}m remaining`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false)
    }, 3000)
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative bg-black aspect-video" onMouseMove={handleMouseMove}>
          {/* Time Remaining Alert */}
          {timeRemaining && timeRemaining < 86400 && (
            <div className="absolute top-4 right-4 z-20">
              <Badge variant="destructive" className="bg-red-600">
                {formatTimeRemaining(timeRemaining)}
              </Badge>
            </div>
          )}

          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            src={`/placeholder-video.mp4`} // In real app, this would be the actual video URL
            poster={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(title)}`}
            onClick={togglePlay}
          />

          {/* Play/Pause Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Button size="lg" className="rounded-full w-16 h-16 bg-primary/80 hover:bg-primary" onClick={togglePlay}>
                <Play className="h-8 w-8 ml-1" />
              </Button>
            </div>
          )}

          {/* Controls */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full h-2 bg-white/20 rounded-full cursor-pointer" onClick={handleSeek}>
                <div
                  className="h-full bg-primary rounded-full transition-all duration-200"
                  style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={togglePlay}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => skipTime(-10)}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={() => skipTime(10)}>
                  <SkipForward className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-2">{title}</h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Duration: {duration}</span>
            <span>Progress: {Math.round((currentTime / totalDuration) * 100) || 0}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
