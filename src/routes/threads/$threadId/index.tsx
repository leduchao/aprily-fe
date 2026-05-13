import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  chatThreads,
  initialMessages,
  type Message,
  type ThreadId,
} from "../../../data/chat";

export const Route = createFileRoute("/threads/$threadId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const params = Route.useParams();
  const threadId = params.threadId as ThreadId | undefined;
  const thread = useMemo(
    () => chatThreads.find((item) => item.id === threadId),
    [threadId],
  );

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    threadId ? (initialMessages[threadId] ?? []) : [],
  );

  const handleSend = () => {
    const trimmed = messageInput.trim();
    if (!trimmed || !threadId) return;

    setMessages((current) => [...current, { from: "me", text: trimmed }]);
    setMessageInput("");
  };

  if (!thread) {
    return (
      <Box sx={{ minHeight: "100vh", padding: 4 }}>
        <Typography variant="h6">Thread not found</Typography>
        <Button variant="contained" onClick={() => navigate({ to: "/" })}>
          Back
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        backgroundColor: "background.default",
      }}
    >
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() =>
          navigate({
            to: "/threads/$threadId/edit",
            params: { threadId: threadId },
          })
        }
      >
        Go to edit
      </Button>

      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate({ to: "/" })}
      >
        Back to conversations
      </Button>

      <Paper
        elevation={1}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 112px)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {thread.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {thread.subtitle}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2,
            backgroundColor: "background.paper",
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  message.from === "me" ? "flex-end" : "flex-start",
                mb: 1.5,
              }}
            >
              <Box
                sx={{
                  maxWidth: "76%",
                  px: 2,
                  py: 1.25,
                  borderRadius: 3,
                  bgcolor: message.from === "me" ? "primary.main" : "grey.100",
                  color:
                    message.from === "me"
                      ? "primary.contrastText"
                      : "text.primary",
                }}
              >
                <Typography variant="body2">{message.text}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Divider />

        <Box sx={{ p: 2, display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Nhập tin nhắn"
            value={messageInput}
            onChange={(event) => setMessageInput(event.target.value)}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!messageInput.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}
