import React, { useState } from 'react'
import { Variants, motion, AnimatePresence } from 'framer-motion'
import Formats from './formats'

type Props = {
  picture: Picture
}

const wrap = (index: number, total: number) => {
  if (index < 0) {
    return total - 1
  }
  if (index === total) {
    return 0
  }
  return index
}

const options = [
  {
    label: 'Square (1:1)',
    Component: Formats.Square,
  },
  {
    label: 'Portrait (3:4)',
    Component: Formats.Portrait,
  },
  {
    label: 'Landscape (7:4)',
    Component: Formats.Landscape,
  },
]

const variants: Variants = {
  enter: {
    opacity: 0,
    x: 500,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -500,
  },
}

const Carousel = ({ picture }: Props) => {
  const [index, setIndex] = useState(0)

  const paginate = (newDirection: number) => {
    const newIndex = wrap(index + newDirection, options.length)
    setIndex(newIndex)
  }

  const Option = options[index]

  return (
    <div>
      <h3>Choose your format</h3>
      <div className="carousel">
        <AnimatePresence initial={false}>
          <motion.div
            className="carousel-item"
            variants={variants}
            initial="enter"
            animate="visible"
            exit="exit"
            key={index}
            transition={{
              type: 'tween',
            }}
          >
            <Option.Component src={picture.url} />
          </motion.div>
        </AnimatePresence>
        <button
          className="carousel-arrow carousel-arrow--left"
          onClick={() => paginate(-1)}
        />
        <button
          className="carousel-arrow carousel-arrow--right"
          onClick={() => paginate(1)}
        />
      </div>
      <div className="carousel-label">
        <span>{options[index].label}</span>
      </div>
    </div>
  )
}

export default Carousel
