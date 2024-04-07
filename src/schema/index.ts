import * as z from 'zod'

export const LoginSchema = z.object({
  username: z.string().min(2, {
    message: '아이디는 최소 2글자 이상이어야 합니다.',
  }),
  password: z.string().min(6, {
    message: '비밀번호는 최소 6글자 이상이어야 합니다.',
  }),
})

export const RegisterSchema = z.object({
  name: z.string().min(2, {
    message: '이름은 최소 2글자 이상이어야 합니다.',
  }),
  studentId: z.string().regex(/^20[0-9]{8}$/, {
    message: '학번은 10글자이어야 합니다.',
  }),
  checked: z.literal<boolean>(true, {
    errorMap: () => ({
      message: '안내 문구를 확인해주세요.',
    }),
  }),
})

const BoardMemberShema = z.object({
  name: z.string(),
  studentId: z.number(),
})

export const BoardSchema = z.object({
  title: z.string().max(30, {
    message: '게시판 제목은 30자 이내이어야 합니다.',
  }),
  intro: z.string(),
  image: z.instanceof(File).refine((f) => f.size < 5000000, {
    message: '파일 크기는 5MB 이하만 가능합니다.',
  }),
  member: z.array(BoardMemberShema),
})

export const PostSchema = z.object({
  title: z.string().min(1, {
    message: '게시판 제목이 비어있습니다.',
  }),
  activityDate: z
    .object(
      {
        from: z.date().optional(),
        to: z.date().optional(),
      },
      { required_error: '활동 날짜가 비어있습니다.' },
    )
    .refine((date) => {
      return !!date.from
    }, '활동 날짜가 비어있습니다.'),
  content: z.string(),
  image: z.instanceof(File).refine((f) => f.size < 5000000, {
    message: '파일 크기는 5MB 이하만 가능합니다.',
  }),
})

export const CommentSchema = z.object({
  content: z.string().min(1, {
    message: '내용을 입력해주세요.',
  }),
  createAt: z.date(),
  user: z.number(),
})

export const GradeMemberSchema = z.object({
  studentId: z.number(),
  grade: z.enum(['해구르르', '팀장', '멤버']),
})

export const UpgradeMemberSchema = z.object({
  studentId: z.number(),
  isAccepted: z.boolean(),
})

export const BanMemberSchema = z.object({
  studentId: z.number(),
})

export const AddSemesterSchema = z.object({
  year: z.string().regex(/^20[0-9]{2}$/, {
    message: '잘못된 연도 입력입니다.'
  }),
  term: z.enum(['1', '2'], {
    errorMap: (issue, ctx) => ({ message: '1학기, 2학기 중에 하나를 입력해주세요.' })
  })
})