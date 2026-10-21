import {Fragment} from 'react'
import {heroLines} from '@/components/decor/placements'
import {SectionLines} from '@/components/decor/SectionLines'
import {Button} from '@/components/ui/Button'
import {Container} from '@/components/ui/Container'
import {Section} from '@/components/ui/Section'
import {site} from '@/content/site'

export function Hero() {
  const {titleLines, intro, cta} = site.hero

  return (
    <Section
      id="accueil"
      tone="chair"
      aria-labelledby="accueil-titre"
      decor={
        <div className="parallax absolute inset-0">
          <SectionLines lines={heroLines} className="reveal-intro text-chair-light" />
        </div>
      }
      className="pt-155 pb-107 lg:pt-218 lg:pb-304"
    >
      <Container>
        <h1 id="accueil-titre" className="text-display font-black text-sapin text-nowrap">
          {titleLines.map((line, lineIndex) => (
            <Fragment key={line.join(' ')}>
              {lineIndex > 0 && <br />}
              {line.map((segment, segmentIndex) => (
                <Fragment key={segment}>
                  {segment}
                  {segmentIndex < line.length - 1 && (
                    <>
                      {' '}
                      <br className="lg:hidden" />
                    </>
                  )}
                </Fragment>
              ))}
            </Fragment>
          ))}
        </h1>
        <div className="lg:ml-284.5">
          <p className="-mr-8 mt-21 text-lead lg:mt-36 lg:mr-0 lg:max-w-640">{intro}</p>
          <div className="mt-79 flex justify-center lg:mt-25 lg:justify-start">
            <Button variant="outline" href={cta.href}>
              {cta.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
