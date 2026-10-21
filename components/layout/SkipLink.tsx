export function SkipLink() {
  return (
    <a
      href="#contenu"
      className="fixed top-16 left-16 z-70 -translate-y-[calc(100%+var(--spacing)*32)] rounded-tr-[0.72em] rounded-bl-[0.72em] bg-sapin px-16 py-8 text-chair transition-transform duration-150 ease-out focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sapin"
    >
      Aller au contenu
    </a>
  )
}
