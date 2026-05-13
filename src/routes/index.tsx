import { createFileRoute } from "@tanstack/react-router";
import {
  Avatar,
  Box,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { chatThreads, type ThreadId } from "../data/chat";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedThreadId, setSelectedThreadId] = useState<ThreadId | null>(
    null,
  );

  const handleSelectThread = (threadId: ThreadId) => {
    setSelectedThreadId(threadId);
    navigate({ to: `/threads/${threadId}` });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: 2,
        overflow: "hidden",
      }}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {t("home.chats")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t("home.chatListSubtitle")}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ padding: 2 }}>
        <TextField
          size="small"
          fullWidth
          placeholder={t("home.searchPlaceholder")}
        />
      </Box>

      <Divider />

      <Stack direction="column" spacing={1} sx={{ overflowY: "auto", px: 1 }}>
        {chatThreads.map((thread) => {
          const selected = thread.id === selectedThreadId;
          return (
            <Box
              key={thread.id}
              onClick={() => handleSelectThread(thread.id)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.5,
                borderRadius: 2,
                cursor: "pointer",
                backgroundColor: selected ? "primary.light" : "transparent",
                transition: "background-color 150ms ease",
              }}
            >
              <Avatar>{thread.title[0]}</Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 700 }}>{thread.title}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {thread.lastMessage}
                </Typography>
              </Box>
              {thread.unread > 0 ? (
                <Box
                  sx={{
                    minWidth: 24,
                    height: 24,
                    borderRadius: "12px",
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    display: "grid",
                    placeItems: "center",
                    px: 1,
                    fontSize: "0.75rem",
                  }}
                >
                  {thread.unread}
                </Box>
              ) : null}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
