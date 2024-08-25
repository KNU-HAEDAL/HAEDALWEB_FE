import { NavLink, PageBreadcrumb } from '@/components/PageBreadcrumb'
import { Seperator } from '@/components/ui/seperator'

export const CreateEventPostHero = () => {
  return (
    <div>
      <Seperator variant="dark" />
      <PageBreadcrumb navLinks={EventPageNavLinks} pageName="게시글 생성하기" />
      <Seperator variant="dark" />
    </div>
  )
}

const EventPageNavLinks: NavLink[] = [
  {
    index: 0,
    link: '/event',
    name: '행사 갤러리',
  },
  {
    index: 1,
    link: '/event/board',
    name: '행사 게시판',
  },
]
