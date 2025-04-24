"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import {
  Check as CheckIcon,
  ContentCopy as CopyIcon,
  SwapHoriz,
  VolumeUp as SpeakIcon,
} from "@mui/icons-material";
import { getLanguageEmoji, TONES } from "./types";
import { useTranslation } from "./useTranslation";
import { LanguageSelector } from "./LanguageSelector";

export const Translator = () => {
  const {
    sourceText,
    setSourceText,
    translatedText,
    sourceLanguage,
    setSourceLanguage,
    targetLanguage,
    setTargetLanguage,
    selectedStyles,
    handleStyleToggle,
    swapLanguages,
  } = useTranslation();

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetLanguage;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          mt: 3,
          borderRadius: "16px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.5)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "5px",
            background: "#1976d2",
          },
        }}
      >
        <Box
          sx={{
            mb: 4,
            p: 3,
            borderRadius: "12px",
            background: "rgba(33, 150, 243, 0.05)",
            border: "1px dashed rgba(33, 150, 243, 0.3)",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#2196f3",
              fontWeight: "bold",
            }}
          >
            Translation Tone
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {TONES.map((tone) => (
              <Chip
                key={tone.id}
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "6px" }}>{tone.icon}</span>
                    {tone.label}
                  </Box>
                }
                onClick={() => handleStyleToggle(tone.id)}
                color={selectedStyles.includes(tone.id) ? "primary" : "default"}
                sx={{
                  m: 0.5,
                  p: 0.5,
                  borderRadius: "12px",
                  fontSize: "1rem",
                  fontWeight: selectedStyles.includes(tone.id) ? "bold" : "normal",
                  transition: "all 0.2s ease",
                  transform: selectedStyles.includes(tone.id) ? "scale(1.05)" : "scale(1)",
                  boxShadow: selectedStyles.includes(tone.id)
                    ? "0 2px 8px rgba(0,0,0,0.15)"
                    : "none",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 4,
            alignItems: "center",
            position: "relative",
          }}
        >
          <LanguageSelector
            label="Source Language"
            value={sourceLanguage}
            onChange={setSourceLanguage}
          />

          <Button
            onClick={swapLanguages}
            sx={{
              minWidth: "45px",
              height: "45px",
              borderRadius: "50%",
              alignSelf: "center",
              background: "#1976d2",
              color: "white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "rotate(180deg)",
                boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
              },
            }}
          >
            <SwapHoriz fontSize="large" />
          </Button>
          <LanguageSelector
            label="Target Language"
            value={targetLanguage}
            onChange={setTargetLanguage}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, mb: 4 }}>
          <Box
            sx={{
              flex: 1,
              position: "relative",
              transition: "all 0.3s ease",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                alignItems: "center",
                color: "#444",
                fontWeight: "bold",
              }}
            >
              {getLanguageEmoji(sourceLanguage)} Source Text:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={8}
              placeholder="Enter text to translate..."
              variant="outlined"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                },
              }}
            />
            <Box sx={{ position: "absolute", bottom: 12, right: 12 }}>
              <Typography variant="caption" color="text.secondary">
                {sourceText.length} characters
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              position: "relative",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", color: "#444", fontWeight: "bold" }}
            >
              {getLanguageEmoji(targetLanguage)} Translation:
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                height: "calc(100% - 72px)",
                borderRadius: "12px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {translatedText ? (
                <Typography>{translatedText}</Typography>
              ) : (
                <Typography color="text.secondary" sx={{ fontStyle: "italic" }}>
                  Translation will appear here
                </Typography>
              )}

              {translatedText && (
                <Box sx={{ position: "absolute", bottom: 8, right: 8 }}>
                  <Tooltip title="Copy to clipboard" TransitionComponent={Zoom}>
                    <IconButton onClick={copyToClipboard} size="small">
                      {copied ? <CheckIcon color="success" /> : <CopyIcon />}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Listen" TransitionComponent={Zoom}>
                    <IconButton onClick={() => speakText(translatedText)} size="small">
                      <SpeakIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Paper>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
