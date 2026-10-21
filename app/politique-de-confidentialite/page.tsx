import type {Metadata} from 'next'
import {heroLines} from '@/components/decor/placements'
import {SectionLines} from '@/components/decor/SectionLines'
import {PrivacyPolicy} from '@/components/privacy/PrivacyPolicy'
import {Container} from '@/components/ui/Container'
import {Section} from '@/components/ui/Section'
import {privacyPolicy} from '@/content/privacy'
import {site} from '@/content/site'
import {openGraph} from '@/lib/seo'

const path = site.footer.privacy.href

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  alternates: {canonical: path},
  openGraph: openGraph({title: `${privacyPolicy.title} | ${site.name}`, description: privacyPolicy.description, path}),
}

export default function PrivacyPolicyPage() {
  const {title} = privacyPolicy

  return (
    <Section
      tone="chair"
      aria-labelledby="politique-titre"
      decor={<SectionLines lines={heroLines} className="text-chair-light" />}
      className="pt-100 pb-120 lg:pt-160 lg:pb-220"
    >
      <Container>
        <article className="max-w-736 text-body">
          <h1 id="politique-titre" className="text-display font-black text-sapin">
            {title}
          </h1>
          <PrivacyPolicy idPrefix="politique" />
        </article>
      </Container>
    </Section>
  )
}
