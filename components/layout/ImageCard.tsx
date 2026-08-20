"use client"

import Image from "next/image"
import { FiCalendar } from "react-icons/fi"
import { SlLocationPin } from "react-icons/sl"
import { IconType } from "react-icons"
import Button from "./Button"

interface ImageCardProps {
  image: string
  title: string

  badge?: {
    text: string
    bgColor?: string
    textColor?: string
  }

  peopleCount?: string | number

  icon?: IconType
  iconGradientFrom?: string
  iconGradientTo?: string

  date?: string
  location?: string
  description?: string

  buttonText?: string
  buttonVariant?: "primary" | "outline"
  buttonHref?: string
  buttonExternal?: boolean
  onButtonClick?: () => void

  className?: string
}

const ImageCard = ({
  image,
  title,
  badge,
  icon: Icon,
  date,
  location,
  description,
  buttonText,
  buttonVariant = "outline",
  buttonHref,
  buttonExternal = false,
  onButtonClick,
  className = "",
}: ImageCardProps) => {
  return (
    <article
      className={`
        group
        flex h-full w-full flex-col
        overflow-hidden
        rounded-2xl
        border border-[#292929]
        bg-[#111111]
        shadow-[0_8px_30px_rgba(0,0,0,0.16)]
        transition-all duration-300 ease-out

        hover:-translate-y-1
        hover:border-[#0854A7]
        hover:shadow-[0_18px_45px_rgba(8,84,167,0.14)]

        ${className}
      `}
    >
      {/* =====================================================
          IMAGE
      ====================================================== */}

      <div
        className="
          relative
          w-full
          overflow-hidden
          bg-[#0c0c0c]
          px-3
          py-3

          sm:px-4
          sm:py-4
        "
      >
        {/* Background glow / depth */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.055),transparent_65%)]
          "
        />

        {/* Image frame */}

        <div
          className="
            relative
            flex
            min-h-[210px]
            w-full
            items-center
            justify-center
            overflow-hidden
            rounded-xl
            bg-[#151515]

            sm:min-h-[230px]
            md:min-h-[250px]
            lg:min-h-[270px]
          "
        >
          <Image
            src={image}
            alt={title}
            fill
            priority={false}
            className="
              object-contain
              p-3

              transition-transform
              duration-500
              ease-out

              group-hover:scale-[1.025]
            "
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 768px) 50vw,
              (max-width: 1024px) 33vw,
              424px
            "
          />

          {/* Image overlay */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-xl
              bg-gradient-to-t
              from-black/20
              via-transparent
              to-transparent
            "
          />
        </div>

        {/* =================================================
            BADGE
        ================================================== */}

        {badge && (
          <div
            className="
              absolute
              left-5
              top-5
              z-10

              rounded-full
              px-3
              py-1.5

              text-[11px]
              font-semibold

              shadow-lg
              backdrop-blur-xl

              sm:left-6
              sm:top-6
              sm:px-4
              sm:py-2
              sm:text-xs
            "
            style={{
              backgroundColor:
                badge.bgColor || "rgba(238, 246, 255, 0.92)",
              color: badge.textColor || "#001D3D",
            }}
          >
            {badge.text}
          </div>
        )}
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          p-4

          sm:p-5
          md:p-6
        "
      >
        <div className="flex-1">

          {/* =================================================
              ICON
          ================================================== */}

          {Icon && (
            <div
              className="
                mb-4
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl

                bg-gradient-to-br
                from-[#197BE8]/30
                to-[#FFA500]/20

                ring-1
                ring-white/10

                transition-transform
                duration-300

                group-hover:scale-105

                sm:h-11
                sm:w-11
              "
            >
              <Icon
                size={20}
                className="
                  text-white
                  sm:h-[22px]
                  sm:w-[22px]
                "
              />
            </div>
          )}

          {/* =================================================
              TITLE
          ================================================== */}

          <h2
            className="
              line-clamp-2

              text-lg
              font-semibold
              leading-snug
              tracking-[-0.02em]
              text-white

              sm:text-xl
              md:text-2xl
            "
          >
            {title}
          </h2>

          {/* =================================================
              DATE / LOCATION
          ================================================== */}

          {(date || location) && (
            <div className="mt-4 space-y-2.5">

              {date && (
                <div className="flex items-center gap-2.5">

                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#0854A7]/10
                    "
                  >
                    <FiCalendar
                      size={15}
                      className="text-[#197BE8]"
                    />
                  </div>

                  <p
                    className="
                      text-xs
                      leading-relaxed
                      text-[#AFAFAF]

                      sm:text-sm
                    "
                  >
                    {date}
                  </p>

                </div>
              )}

              {location && (
                <div className="flex items-center gap-2.5">

                  <div
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#0854A7]/10
                    "
                  >
                    <SlLocationPin
                      size={15}
                      className="text-[#197BE8]"
                    />
                  </div>

                  <p
                    className="
                      line-clamp-1
                      text-xs
                      leading-relaxed
                      text-[#AFAFAF]

                      sm:text-sm
                    "
                  >
                    {location}
                  </p>

                </div>
              )}

            </div>
          )}

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          {description && !date && !location && (
            <p
              className="
                mt-4
                line-clamp-3
                text-sm
                leading-6
                text-[#AFAFAF]
              "
            >
              {description}
            </p>
          )}

        </div>

        {/* =================================================
            BUTTON
        ================================================== */}

        {buttonText && (
          <div className="mt-6">

            <Button
              type="button"
              variant={buttonVariant}
              href={buttonHref}
              external={buttonExternal}
              onClick={onButtonClick}
              className="
                w-full
                rounded-xl
                py-2.5
                text-sm
                font-medium

                transition-all
                duration-300

                sm:py-3
              "
            >
              {buttonText}
            </Button>

          </div>
        )}

      </div>
    </article>
  )
}

export default ImageCard