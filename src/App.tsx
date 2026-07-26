import { useState } from 'react'
import { curriculum } from './data/curriculum'
import { useProgress } from './useProgress'
import { Home } from './components/Home'
import { LessonPlayer } from './components/LessonPlayer'
import { City } from './components/City'
import type { Lesson, Exercise } from './types'

const REVIEW_SIZE = 8

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const { progress, finishLesson, recordMistakes, build, reset, toggleFreeMode } = useProgress()
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null)
  const [isReview, setIsReview] = useState(false)
  const [showCity, setShowCity] = useState(false)

  function startLesson(lesson: Lesson) {
    setIsReview(false)
    setActiveLesson(lesson)
  }

  // Costruisce una lezione di ripasso dagli errori accumulati.
  function startReview() {
    const exercises: Exercise[] = shuffle(progress.mistakes).slice(0, REVIEW_SIZE)
    if (exercises.length === 0) return
    setIsReview(true)
    setActiveLesson({ id: 'repetitio', title: 'Repetitio', icon: '🔁', exercises })
  }

  function close() {
    setActiveLesson(null)
    setIsReview(false)
  }

  if (activeLesson) {
    return (
      <LessonPlayer
        lesson={activeLesson}
        reviewMode={isReview}
        onQuit={(wrong, correct) => {
          recordMistakes(wrong, correct)
          close()
        }}
        onFinish={(xp, wrong, correct) => {
          finishLesson({ lessonId: isReview ? null : activeLesson.id, xp, wrong, correct })
          close()
        }}
      />
    )
  }

  if (showCity) {
    return <City progress={progress} onBuild={build} onBack={() => setShowCity(false)} />
  }

  return (
    <Home
      units={curriculum}
      progress={progress}
      onStartLesson={startLesson}
      onStartReview={startReview}
      onOpenCity={() => setShowCity(true)}
      onReset={reset}
      onToggleFreeMode={toggleFreeMode}
    />
  )
}
