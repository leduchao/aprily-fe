export type Thread = {
  id: ThreadId;
  title: string;
  subtitle: string;
  lastMessage: string;
  unread: number;
};

export type ThreadId = "friend-1" | "group-1" | "friend-2";

export type Message = {
  from: "me" | "them";
  text: string;
};

export const chatThreads: readonly Thread[] = [
  {
    id: "friend-1",
    title: "Mai",
    subtitle: "Đã gửi 2 ảnh",
    lastMessage: "Ok, mình sẽ qua chơi lúc 7h",
    unread: 1,
  },
  {
    id: "group-1",
    title: "Team Product",
    subtitle: "Đã thêm tài liệu design",
    lastMessage: "Mọi người có ý kiến gì không?",
    unread: 3,
  },
  {
    id: "friend-2",
    title: "Hùng",
    subtitle: "Đang online",
    lastMessage: "Mai nhé, tớ bận họp xong sẽ gọi lại",
    unread: 0,
  },
] as const;

export const initialMessages: Record<ThreadId, Message[]> = {
  "friend-1": [
    { from: "them", text: "Mình ghé uống cà phê chiều nay nhé?" },
    { from: "me", text: "Ok, mình sẽ qua chơi lúc 7h" },
  ],
  "group-1": [
    { from: "them", text: "Mọi người có ý kiến gì không?" },
    { from: "me", text: "Mình thấy nên chốt bản roadmap trước." },
  ],
  "friend-2": [
    { from: "them", text: "Nhớ mang bản thuyết trình nhé." },
    { from: "me", text: "Ok, tớ chuẩn bị xong rồi." },
  ],
};
