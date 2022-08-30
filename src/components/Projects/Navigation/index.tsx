import { useCycle } from 'framer-motion'
import React, { useState, useEffect, useCallback } from 'react'

import { Animated } from '../../../components/UI'
import useBodyLock from '../../../hooks/useBodyLock'
import { SectionsType } from '../Section/types'
import NavigationItem, { PossibleTypes } from './NavigationItem'
import * as S from './styled'

interface INavigation {
  content: SectionsType[]
}

const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 300,
  damping: 35,
}

const Navigation: React.FC<INavigation> = ({ content }) => {
  const [visible, toggleVisible] = useCycle(false, true)
  const [isButtonVisible, setButtonVisible] = useState<boolean>(false)
  useBodyLock(visible)

  const handleScroll = useCallback(() => {
    const totalHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    )
    const shouldShow =
      window.scrollY > 800 &&
      window.scrollY < totalHeight - window.innerHeight - 800

    if (shouldShow && !isButtonVisible) {
      return setButtonVisible(true)
    }

    if (!shouldShow && isButtonVisible) {
      return setButtonVisible(false)
    }
  }, [isButtonVisible])

  // Only show button closer to the bottom
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [visible, isButtonVisible, handleScroll])

  const items = content.filter((section, _index) => {
    const wantedTypes = [
      'chapter',
      'section',
      'text',
      'sticky_image',
      'sticky_video',
    ]
    return wantedTypes.indexOf(section.slice_type) >= 0
  })

  return (
    <>
      {/* Button */}
      <Animated>
        {isButtonVisible && (
          <S.AnimatedNavButton
            key={'nav button'}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ ease: 'easeInOut', duration: 0.2 }}
            onClick={toggleVisible}
            visible={visible}
          >
            <S.ButtonLine />
            <S.ButtonLine />
            <S.ButtonLine />
          </S.AnimatedNavButton>
        )}
      </Animated>

      {/* Drawer */}
      <S.AnimatedDrawer
        initial={false}
        animate={visible ? 'open' : 'closed'}
        variants={{
          open: {
            x: 0,
            transition: {
              ...SPRING_TRANSITION,
              staggerChildren: 0.02,
              delayChildren: 0.1,
            },
          },
          closed: {
            x: '-20em',
            transition: SPRING_TRANSITION,
          },
        }}
      >
        {items.map((item, index: number) => (
          <NavigationItem
            key={index}
            item={item as PossibleTypes}
            toggleVisible={toggleVisible}
            variants={{
              open: { x: 0, opacity: 1 },
              closed: { x: -20, opacity: 0 },
            }}
          />
        ))}
      </S.AnimatedDrawer>

      {/* Overlay */}
      <Animated>
        {visible && (
          <S.AnimatedOverlay
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.2 }}
            onClick={() => toggleVisible()}
          />
        )}
      </Animated>
    </>
  )
}

export default Navigation
