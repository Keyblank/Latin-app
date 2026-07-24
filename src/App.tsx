import { useState } from 'react'
import { curriculum } from './data/curriculum'
import { useProgress } from './useProgress'
import { Home } from './components/Home'
import { LessonPlayer } from './components/LessonPlayer'
import type { Lesson } from './types'

export default function App() {
  const { progress, completeLesson, reset, toggleFreeMode } = useProgress()
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null)

  if (activeLesson) {
    return (
      <LessonPlayer
        lesson={activeLesson}
        onExit={() => setActiveLesson(null)}
        onFinish={(xp) => {
          completeLesson(activeLesson.id, xp)
          setActiveLesson(null)
        }}
      />
    )
  }

  return (
    <Home
      units={curriculum}
      progress={progress}
      onStartLesson={setActiveLesson}
      onReset={reset}
      onToggleFreeMode={toggleFreeMode}
    />
  )
}
