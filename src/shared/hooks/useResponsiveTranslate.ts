import { useState, useEffect } from 'react'

export const useResponsiveTranslate = () => {
  const [translateX, setTranslateX] = useState(365)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const calculateTranslateX = () => {
      const screenWidth = window.innerWidth
      const containerWidth = 600 // 최대 컨테이너 너비
      
      if (screenWidth <= 600) {
        setTranslateX(0) // 모바일에서는 transform 없음
      } else {
        // 데스크톱에서는 화면 중앙에 맞춰서 계산
        const offset = (screenWidth - containerWidth) / 2
        setTranslateX(offset)
      }
    }

    const handleResize = () => {
      // Throttling: 100ms마다 한 번만 실행
      clearTimeout(timeoutId)
      timeoutId = setTimeout(calculateTranslateX, 100)
    }

    // 초기 계산
    calculateTranslateX()
    
    // resize 이벤트 리스너 추가
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [])

  return translateX
} 