'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const About = () => {
  return (
    <section
      className="lc-section-soft py-20 lg:py-24"
      id="about"
    >
      {/* Simple, clean background with subtle gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Improved gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6FBF3] via-[#EEF6E8] to-transparent opacity-80" />

        {/* Minimal decorative elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-primary-light/5 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-56 h-56 rounded-full bg-accent/5 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 1,
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="relative w-full max-w-[100%] mx-auto rounded-[12px] overflow-hidden lc-glass-card-strong">
          {/* Simple yellow background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FCFEFA] to-[#ECF6E4]"></div>

          <div className="px-4 py-16 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {/* Hello hand image in a white circle */}
              <div className="flex justify-center mb-6">
                <motion.div
                  className="lc-chip rounded-[10px] p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <Image
                    className="w-14 h-14 object-contain"
                    src="/images/hi_hand.png"
                    alt="Hello hand"
                    width={56}
                    height={56}
                  />
                </motion.div>
              </div>

              <h2 className="lc-section-title mb-4 text-center">
                ПРО <span className="text-accent">LEO CODE</span>
              </h2>
              <p className="lc-section-lead text-center mb-8 max-w-2xl mx-auto">
                Місце, де кожна дитина може розкрити свій потенціал через
                наукові, творчі, технічно-інженерні та математичні напрямки
              </p>

              {/* Content styled to match the warm, light background */}
              <div className="prose prose-lg max-w-none text-primary/80 mb-8 text-lg px-4">
                <p className="mb-6">
                  <strong className="text-text">LEO CODE</strong> - простір, де
                  кожна дитина може розкрити свій потенціал через наукові,
                  творчі, технічно-інженерні та математичні напрямки. Це місце,
                  де дитина розвиває вміння та навички, поглиблює свої знання за
                  допомогою досліджень та експериментів.
                </p>

                <p className="mb-8 text-primary/80">
                  Наші програми адаптовані до віку та різних рівнів підготовки,
                  щоб кожна дитина отримала максимум від кожного заняття. Ми
                  прагнемо створити атмосферу, в якій дитині буде легко та
                  цікаво засвоювати нові знання.
                </p>

                <div className="lc-glass-card rounded-[10px] px-5 py-4">
                  <p className="m-0 text-base md:text-lg text-primary/85">
                    Також у LEO CODE проводимо{' '}
                    <Link
                      href="/naukovi-yarmarky"
                      className="font-semibold text-accent hover:text-primary-light transition-colors underline underline-offset-4"
                    >
                      наукові ярмарки
                    </Link>{' '}
                    , де діти презентують власні проєкти, тренують публічні
                    виступи та отримують практичний досвід командної роботи.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
