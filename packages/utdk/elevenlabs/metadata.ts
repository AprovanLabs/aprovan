import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "get_speech_history": {
    "accessPath": [
      "getSpeechHistory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/history",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "start_after_history_item_id",
      "voice_id",
      "model_id",
      "date_before_unix",
      "date_after_unix",
      "sort_direction",
      "search",
      "source"
    ],
    "description": "List Generated Items",
    "parameterDescriptions": {
      "page_size": "How many history items to return at maximum. Can not exceed 1000, defaults to 100.",
      "start_after_history_item_id": "After which ID to start fetching, use this parameter to paginate across a large collection of history items. In case this parameter is not provided history items will be fetched starting from the most recently created one ordered descending by their creation date.",
      "voice_id": "Voice ID to be filtered for, you can use GET https://api.elevenlabs.io/v1/voices to receive a list of voices and their IDs.",
      "model_id": "Model ID to filter history items by.",
      "date_before_unix": "Unix timestamp to filter history items before this date (exclusive).",
      "date_after_unix": "Unix timestamp to filter history items after this date (inclusive).",
      "sort_direction": "Sort direction for the results.",
      "search": "search term used for filtering",
      "source": "Source of the generated history item",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_speech_history_item_by_id": {
    "accessPath": [
      "getSpeechHistoryItemById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/history/{history_item_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "history_item_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get History Item",
    "parameterDescriptions": {
      "history_item_id": "History item ID to be used, you can use GET https://api.elevenlabs.io/v1/history to receive a list of history items and their IDs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_speech_history_item": {
    "accessPath": [
      "deleteSpeechHistoryItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/history/{history_item_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "history_item_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete History Item",
    "parameterDescriptions": {
      "history_item_id": "History item ID to be used, you can use GET https://api.elevenlabs.io/v1/history to receive a list of history items and their IDs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_audio_full_from_speech_history_item": {
    "accessPath": [
      "getAudioFullFromSpeechHistoryItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/history/{history_item_id}/audio",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "history_item_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Audio From History Item",
    "parameterDescriptions": {
      "history_item_id": "History item ID to be used, you can use GET https://api.elevenlabs.io/v1/history to receive a list of history items and their IDs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "download_speech_history_items": {
    "accessPath": [
      "downloadSpeechHistoryItems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "history_item_ids",
      "output_format"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/history/download",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Download History Items",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "sound_generation": {
    "accessPath": [
      "soundGeneration"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "text",
      "loop",
      "duration_seconds",
      "prompt_influence",
      "model_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/sound-generation",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "output_format"
    ],
    "description": "Sound Generation",
    "parameterDescriptions": {
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "audio_isolation": {
    "accessPath": [
      "audioIsolation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "audio",
      "file_format",
      "preview_b64"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/audio-isolation",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Audio Isolation",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_audio_isolation_history": {
    "accessPath": [
      "getAudioIsolationHistory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/audio-isolation/history",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "page",
      "search"
    ],
    "description": "Get Audio Isolation History",
    "parameterDescriptions": {
      "page_size": "How many history items to return at maximum. Defaults to 100.",
      "page": "Page number for search pagination (1-based). Only used when search is provided.",
      "search": "Optional search term used for filtering audio isolation history (title/text).",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_audio_isolation_history_item": {
    "accessPath": [
      "deleteAudioIsolationHistoryItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/audio-isolation/history/{history_item_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "history_item_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Audio Isolation History Item",
    "parameterDescriptions": {
      "history_item_id": "Identifier of the audio isolation history item.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "audio_isolation_stream": {
    "accessPath": [
      "audioIsolationStream"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "audio",
      "file_format"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/audio-isolation/stream",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Audio Isolation Stream",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_sample": {
    "accessPath": [
      "deleteSample"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/voices/{voice_id}/samples/{sample_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id",
      "sample_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Sample",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "sample_id": "Sample ID to be used, you can use GET https://api.elevenlabs.io/v1/voices/{voice_id} to list all the available samples for a voice.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_audio_from_sample": {
    "accessPath": [
      "getAudioFromSample"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/voices/{voice_id}/samples/{sample_id}/audio",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id",
      "sample_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Audio From Sample",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "sample_id": "Sample ID to be used, you can use GET https://api.elevenlabs.io/v1/voices/{voice_id} to list all the available samples for a voice.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "text_to_speech_full": {
    "accessPath": [
      "textToSpeechFull"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "text",
      "model_id",
      "language_code",
      "voice_settings",
      "pronunciation_dictionary_locators",
      "seed",
      "previous_text",
      "next_text",
      "previous_request_ids",
      "next_request_ids",
      "use_pvc_as_ivc",
      "apply_text_normalization",
      "apply_language_text_normalization"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/text-to-speech/{voice_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "enable_logging",
      "optimize_streaming_latency",
      "output_format"
    ],
    "description": "Text To Speech",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "enable_logging": "When enable_logging is set to false zero retention mode will be used for the request. This will mean history features are unavailable for this request, including request stitching. Zero retention mode may only be used by enterprise customers.",
      "optimize_streaming_latency": "You can turn on latency optimizations at some cost of quality. The best possible final latency varies by model. Possible values:\n0 - default mode (no latency optimizations)\n1 - normal latency optimizations (about 50% of possible latency improvement of option 3)\n2 - strong latency optimizations (about 75% of possible latency improvement of option 3)\n3 - max latency optimizations\n4 - max latency optimizations, but also with text normalizer turned off for even more latency savings (best latency, but can mispronounce eg numbers and dates).\n\nDefaults to None.\n",
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM and WAV formats with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "text_to_speech_full_with_timestamps": {
    "accessPath": [
      "textToSpeechFullWithTimestamps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "text",
      "model_id",
      "language_code",
      "voice_settings",
      "pronunciation_dictionary_locators",
      "seed",
      "previous_text",
      "next_text",
      "previous_request_ids",
      "next_request_ids",
      "use_pvc_as_ivc",
      "apply_text_normalization",
      "apply_language_text_normalization"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/text-to-speech/{voice_id}/with-timestamps",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "enable_logging",
      "optimize_streaming_latency",
      "output_format"
    ],
    "description": "Text To Speech With Timestamps",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "enable_logging": "When enable_logging is set to false zero retention mode will be used for the request. This will mean history features are unavailable for this request, including request stitching. Zero retention mode may only be used by enterprise customers.",
      "optimize_streaming_latency": "You can turn on latency optimizations at some cost of quality. The best possible final latency varies by model. Possible values:\n0 - default mode (no latency optimizations)\n1 - normal latency optimizations (about 50% of possible latency improvement of option 3)\n2 - strong latency optimizations (about 75% of possible latency improvement of option 3)\n3 - max latency optimizations\n4 - max latency optimizations, but also with text normalizer turned off for even more latency savings (best latency, but can mispronounce eg numbers and dates).\n\nDefaults to None.\n",
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM and WAV formats with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "text_to_speech_stream": {
    "accessPath": [
      "textToSpeechStream"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "text",
      "model_id",
      "language_code",
      "voice_settings",
      "pronunciation_dictionary_locators",
      "seed",
      "previous_text",
      "next_text",
      "previous_request_ids",
      "next_request_ids",
      "use_pvc_as_ivc",
      "apply_text_normalization",
      "apply_language_text_normalization"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/text-to-speech/{voice_id}/stream",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "enable_logging",
      "optimize_streaming_latency",
      "output_format"
    ],
    "description": "Text To Speech Streaming",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "enable_logging": "When enable_logging is set to false zero retention mode will be used for the request. This will mean history features are unavailable for this request, including request stitching. Zero retention mode may only be used by enterprise customers.",
      "optimize_streaming_latency": "You can turn on latency optimizations at some cost of quality. The best possible final latency varies by model. Possible values:\n0 - default mode (no latency optimizations)\n1 - normal latency optimizations (about 50% of possible latency improvement of option 3)\n2 - strong latency optimizations (about 75% of possible latency improvement of option 3)\n3 - max latency optimizations\n4 - max latency optimizations, but also with text normalizer turned off for even more latency savings (best latency, but can mispronounce eg numbers and dates).\n\nDefaults to None.\n",
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "text_to_speech_stream_with_timestamps": {
    "accessPath": [
      "textToSpeechStreamWithTimestamps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "text",
      "model_id",
      "language_code",
      "voice_settings",
      "pronunciation_dictionary_locators",
      "seed",
      "previous_text",
      "next_text",
      "previous_request_ids",
      "next_request_ids",
      "use_pvc_as_ivc",
      "apply_text_normalization",
      "apply_language_text_normalization"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/text-to-speech/{voice_id}/stream/with-timestamps",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "enable_logging",
      "optimize_streaming_latency",
      "output_format"
    ],
    "description": "Text To Speech Streaming With Timestamps",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "enable_logging": "When enable_logging is set to false zero retention mode will be used for the request. This will mean history features are unavailable for this request, including request stitching. Zero retention mode may only be used by enterprise customers.",
      "optimize_streaming_latency": "You can turn on latency optimizations at some cost of quality. The best possible final latency varies by model. Possible values:\n0 - default mode (no latency optimizations)\n1 - normal latency optimizations (about 50% of possible latency improvement of option 3)\n2 - strong latency optimizations (about 75% of possible latency improvement of option 3)\n3 - max latency optimizations\n4 - max latency optimizations, but also with text normalizer turned off for even more latency savings (best latency, but can mispronounce eg numbers and dates).\n\nDefaults to None.\n",
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "text_to_dialogue": {
    "accessPath": [
      "textToDialogue"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "inputs",
      "model_id",
      "language_code",
      "settings",
      "pronunciation_dictionary_locators",
      "seed",
      "apply_text_normalization"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/text-to-dialogue",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "output_format"
    ],
    "description": "Text To Dialogue (Multi-Voice)",
    "parameterDescriptions": {
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM and WAV formats with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "text_to_dialogue_stream": {
    "accessPath": [
      "textToDialogueStream"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "inputs",
      "model_id",
      "language_code",
      "settings",
      "pronunciation_dictionary_locators",
      "seed",
      "apply_text_normalization"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/text-to-dialogue/stream",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "output_format"
    ],
    "description": "Text To Dialogue (Multi-Voice) Streaming",
    "parameterDescriptions": {
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "text_to_dialogue_stream_with_timestamps": {
    "accessPath": [
      "textToDialogueStreamWithTimestamps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "inputs",
      "model_id",
      "language_code",
      "settings",
      "pronunciation_dictionary_locators",
      "seed",
      "apply_text_normalization"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/text-to-dialogue/stream/with-timestamps",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "output_format"
    ],
    "description": "Text To Dialogue Streaming With Timestamps",
    "parameterDescriptions": {
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "text_to_dialogue_full_with_timestamps": {
    "accessPath": [
      "textToDialogueFullWithTimestamps"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "inputs",
      "model_id",
      "language_code",
      "settings",
      "pronunciation_dictionary_locators",
      "seed",
      "apply_text_normalization"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/text-to-dialogue/with-timestamps",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "output_format"
    ],
    "description": "Text To Dialogue With Timestamps",
    "parameterDescriptions": {
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM and WAV formats with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "speech_to_speech_full": {
    "accessPath": [
      "speechToSpeechFull"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "audio",
      "model_id",
      "voice_settings",
      "seed",
      "remove_background_noise",
      "file_format"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/speech-to-speech/{voice_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "enable_logging",
      "optimize_streaming_latency",
      "output_format"
    ],
    "description": "Speech To Speech",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "enable_logging": "When enable_logging is set to false zero retention mode will be used for the request. This will mean history features are unavailable for this request, including request stitching. Zero retention mode may only be used by enterprise customers.",
      "optimize_streaming_latency": "You can turn on latency optimizations at some cost of quality. The best possible final latency varies by model. Possible values:\n0 - default mode (no latency optimizations)\n1 - normal latency optimizations (about 50% of possible latency improvement of option 3)\n2 - strong latency optimizations (about 75% of possible latency improvement of option 3)\n3 - max latency optimizations\n4 - max latency optimizations, but also with text normalizer turned off for even more latency savings (best latency, but can mispronounce eg numbers and dates).\n\nDefaults to None.\n",
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM and WAV formats with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "speech_to_speech_stream": {
    "accessPath": [
      "speechToSpeechStream"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "audio",
      "model_id",
      "voice_settings",
      "seed",
      "remove_background_noise",
      "file_format"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/speech-to-speech/{voice_id}/stream",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "enable_logging",
      "optimize_streaming_latency",
      "output_format"
    ],
    "description": "Speech To Speech Streaming",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "enable_logging": "When enable_logging is set to false zero retention mode will be used for the request. This will mean history features are unavailable for this request, including request stitching. Zero retention mode may only be used by enterprise customers.",
      "optimize_streaming_latency": "You can turn on latency optimizations at some cost of quality. The best possible final latency varies by model. Possible values:\n0 - default mode (no latency optimizations)\n1 - normal latency optimizations (about 50% of possible latency improvement of option 3)\n2 - strong latency optimizations (about 75% of possible latency improvement of option 3)\n3 - max latency optimizations\n4 - max latency optimizations, but also with text normalizer turned off for even more latency savings (best latency, but can mispronounce eg numbers and dates).\n\nDefaults to None.\n",
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "text_to_voice": {
    "accessPath": [
      "textToVoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "voice_description",
      "text",
      "auto_generate_text",
      "loudness",
      "quality",
      "seed",
      "guidance_scale",
      "should_enhance"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/text-to-voice/create-previews",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "output_format"
    ],
    "description": "[Deprecated] Generate A Voice Preview From Description",
    "parameterDescriptions": {
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_voice": {
    "accessPath": [
      "createVoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "voice_name",
      "voice_description",
      "generated_voice_id",
      "labels",
      "played_not_selected_voice_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/text-to-voice",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create A New Voice From Voice Preview",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "text_to_voice_design": {
    "accessPath": [
      "textToVoiceDesign"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "voice_description",
      "model_id",
      "text",
      "auto_generate_text",
      "loudness",
      "seed",
      "guidance_scale",
      "stream_previews",
      "should_enhance",
      "remixing_session_id",
      "remixing_session_iteration_id",
      "quality",
      "reference_audio_base64",
      "prompt_strength"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/text-to-voice/design",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "output_format"
    ],
    "description": "Design A Voice.",
    "parameterDescriptions": {
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "text_to_voice_remix": {
    "accessPath": [
      "textToVoiceRemix"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "voice_description",
      "text",
      "auto_generate_text",
      "loudness",
      "seed",
      "guidance_scale",
      "stream_previews",
      "remixing_session_id",
      "remixing_session_iteration_id",
      "prompt_strength"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/text-to-voice/{voice_id}/remix",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "output_format"
    ],
    "description": "Remix A Voice.",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "text_to_voice_preview_stream": {
    "accessPath": [
      "textToVoicePreviewStream"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/text-to-voice/{generated_voice_id}/stream",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "generated_voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Text To Voice Preview Streaming",
    "parameterDescriptions": {
      "generated_voice_id": "The generated_voice_id to stream.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_user_info": {
    "accessPath": [
      "getUserInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/user",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get User Info",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_user_subscription_info": {
    "accessPath": [
      "getUserSubscriptionInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/user/subscription",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get User Subscription Info",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_voice_settings_default": {
    "accessPath": [
      "getVoiceSettingsDefault"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/voices/settings/default",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Default Voice Settings."
  },
  "get_voice_settings": {
    "accessPath": [
      "getVoiceSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/voices/{voice_id}/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Voice Settings",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "edit_voice_settings": {
    "accessPath": [
      "editVoiceSettings"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "stability",
      "use_speaker_boost",
      "similarity_boost",
      "style",
      "speed"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/voices/{voice_id}/settings/edit",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Edit Voice Settings",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_voices": {
    "accessPath": [
      "getVoices"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/voices",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "show_legacy"
    ],
    "description": "List Voices",
    "parameterDescriptions": {
      "show_legacy": "If set to true, legacy premade voices will be included in responses from /v1/voices",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_user_voices_v2": {
    "accessPath": [
      "getUserVoicesV2"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v2/voices",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "next_page_token",
      "page_size",
      "search",
      "sort",
      "sort_direction",
      "voice_type",
      "category",
      "fine_tuning_state",
      "collection_id",
      "include_total_count",
      "voice_ids"
    ],
    "description": "Get Voices V2",
    "parameterDescriptions": {
      "next_page_token": "The next page token to use for pagination. Returned from the previous request. Use this in combination with the has_more flag for reliable pagination.",
      "page_size": "How many voices to return at maximum. Can not exceed 100, defaults to 10. Page 0 may include more voices due to default voices being included.",
      "search": "Search term to filter voices by. Searches in name, description, labels, category.",
      "sort": "Which field to sort by, one of 'created_at_unix' or 'name'. 'created_at_unix' may not be available for older voices.",
      "sort_direction": "Which direction to sort the voices in. 'asc' or 'desc'.",
      "voice_type": "Type of the voice to filter by. One of 'personal', 'community', 'default', 'workspace', 'non-default', 'non-community', 'saved'. 'non-default' is equal to all but 'default'. 'non-community' is equal to 'personal' and 'workspace' combined (excludes library copies). 'saved' is equal to non-default, but includes default voices if they have been added to a collection.",
      "category": "Category of the voice to filter by. One of 'premade', 'cloned', 'generated', 'professional'",
      "fine_tuning_state": "State of the voice's fine tuning to filter by. Applicable only to professional voices clones. One of 'draft', 'not_verified', 'not_started', 'queued', 'fine_tuning', 'fine_tuned', 'failed', 'delayed'",
      "collection_id": "Collection ID to filter voices by.",
      "include_total_count": "Whether to include the total count of voices found in the response. NOTE: The total_count value is a live snapshot and may change between requests as users create, modify, or delete voices. For pagination, rely on the has_more flag instead. Only enable this when you actually need the total count (e.g., for display purposes), as it incurs a performance cost.",
      "voice_ids": "Voice IDs to lookup by. Maximum 100 voice IDs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_voice_by_id": {
    "accessPath": [
      "getVoiceById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/voices/{voice_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "with_settings"
    ],
    "description": "Get Voice",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "with_settings": "This parameter is now deprecated. It is ignored and will be removed in a future version.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_voice": {
    "accessPath": [
      "deleteVoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/voices/{voice_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Voice",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "add_voice": {
    "accessPath": [
      "addVoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "files",
      "remove_background_noise",
      "description",
      "labels"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/voices/add",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add Voice",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "edit_voice": {
    "accessPath": [
      "editVoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "files",
      "remove_background_noise",
      "description",
      "labels",
      "moderate_metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/voices/{voice_id}/edit",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Edit Voice",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "add_sharing_voice": {
    "accessPath": [
      "addSharingVoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "new_name",
      "bookmarked"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/voices/add/{public_user_id}/{voice_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "public_user_id",
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add Shared Voice",
    "parameterDescriptions": {
      "public_user_id": "Public user ID used to publicly identify ElevenLabs users.",
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_podcast": {
    "accessPath": [
      "createPodcast"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "model_id",
      "mode",
      "source",
      "quality_preset",
      "duration_scale",
      "language",
      "intro",
      "outro",
      "instructions_prompt",
      "highlights",
      "callback_url",
      "apply_text_normalization"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "safety-identifier",
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/studio/podcasts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Podcast",
    "parameterDescriptions": {
      "safety-identifier": "Used for moderation. Your workspace must be allowlisted to use this feature.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "video_to_music": {
    "accessPath": [
      "videoToMusic"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "videos",
      "description",
      "tags",
      "model_id",
      "sign_with_c2pa"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/music/video-to-music",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "output_format"
    ],
    "description": "Video To Music",
    "parameterDescriptions": {
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_pronunciation_dictionaries": {
    "accessPath": [
      "updatePronunciationDictionaries"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "pronunciation_dictionary_locators",
      "invalidate_affected_text"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/studio/projects/{project_id}/pronunciation-dictionaries",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Pronunciation Dictionaries",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_projects": {
    "accessPath": [
      "getProjects"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/studio/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Studio Projects",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "add_project": {
    "accessPath": [
      "addProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "default_title_voice_id",
      "default_paragraph_voice_id",
      "default_model_id",
      "from_url",
      "from_document",
      "from_content_json",
      "quality_preset",
      "title",
      "author",
      "description",
      "genres",
      "target_audience",
      "language",
      "content_type",
      "original_publication_date",
      "mature_content",
      "isbn_number",
      "acx_volume_normalization",
      "volume_normalization",
      "pronunciation_dictionary_locators",
      "callback_url",
      "fiction",
      "apply_text_normalization",
      "auto_convert",
      "auto_assign_voices",
      "source_type",
      "voice_settings",
      "create_publishing_read"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/studio/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Studio Project",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "edit_project": {
    "accessPath": [
      "editProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "default_title_voice_id",
      "default_paragraph_voice_id",
      "title",
      "author",
      "isbn_number",
      "volume_normalization"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/studio/projects/{project_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Studio Project",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_project_by_id": {
    "accessPath": [
      "getProjectById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/studio/projects/{project_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "share_id"
    ],
    "description": "Get Studio Project",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "share_id": "The share ID of the project",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_project": {
    "accessPath": [
      "deleteProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/studio/projects/{project_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Studio Project",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "edit_project_content": {
    "accessPath": [
      "editProjectContent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "from_url",
      "from_document",
      "from_content_json",
      "auto_convert"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/studio/projects/{project_id}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Studio Project Content",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "convert_project_endpoint": {
    "accessPath": [
      "convertProjectEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/studio/projects/{project_id}/convert",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Convert Studio Project",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_project_snapshots": {
    "accessPath": [
      "getProjectSnapshots"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/studio/projects/{project_id}/snapshots",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Studio Project Snapshots",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_project_snapshot_endpoint": {
    "accessPath": [
      "getProjectSnapshotEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/studio/projects/{project_id}/snapshots/{project_snapshot_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "project_snapshot_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Project Snapshot",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "project_snapshot_id": "The ID of the Studio project snapshot.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "stream_project_snapshot_audio_endpoint": {
    "accessPath": [
      "streamProjectSnapshotAudioEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "convert_to_mpeg"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/studio/projects/{project_id}/snapshots/{project_snapshot_id}/stream",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "project_snapshot_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Stream Studio Project Audio",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "project_snapshot_id": "The ID of the Studio project snapshot.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "stream_project_snapshot_archive_endpoint": {
    "accessPath": [
      "streamProjectSnapshotArchiveEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/studio/projects/{project_id}/snapshots/{project_snapshot_id}/archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "project_snapshot_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Stream Archive With Studio Project Audio",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "project_snapshot_id": "The ID of the Studio project snapshot.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_chapters": {
    "accessPath": [
      "getChapters"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/studio/projects/{project_id}/chapters",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Chapters",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "add_chapter": {
    "accessPath": [
      "addChapter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "from_url"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/studio/projects/{project_id}/chapters",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Chapter",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_chapter_by_id_endpoint": {
    "accessPath": [
      "getChapterByIdEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/studio/projects/{project_id}/chapters/{chapter_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "chapter_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Chapter",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "chapter_id": "The ID of the chapter.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "edit_chapter": {
    "accessPath": [
      "editChapter"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "content"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/studio/projects/{project_id}/chapters/{chapter_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "chapter_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Chapter",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "chapter_id": "The ID of the chapter.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_chapter_endpoint": {
    "accessPath": [
      "deleteChapterEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/studio/projects/{project_id}/chapters/{chapter_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "chapter_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Chapter",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "chapter_id": "The ID of the chapter.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "convert_chapter_endpoint": {
    "accessPath": [
      "convertChapterEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/studio/projects/{project_id}/chapters/{chapter_id}/convert",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "chapter_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Convert Chapter",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "chapter_id": "The ID of the chapter.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_chapter_snapshots": {
    "accessPath": [
      "getChapterSnapshots"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/studio/projects/{project_id}/chapters/{chapter_id}/snapshots",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "chapter_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Chapter Snapshots",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "chapter_id": "The ID of the chapter.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_chapter_snapshot_endpoint": {
    "accessPath": [
      "getChapterSnapshotEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/studio/projects/{project_id}/chapters/{chapter_id}/snapshots/{chapter_snapshot_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "chapter_id",
      "chapter_snapshot_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Chapter Snapshot",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "chapter_id": "The ID of the chapter.",
      "chapter_snapshot_id": "The ID of the chapter snapshot.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "stream_chapter_snapshot_audio": {
    "accessPath": [
      "streamChapterSnapshotAudio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "convert_to_mpeg"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/studio/projects/{project_id}/chapters/{chapter_id}/snapshots/{chapter_snapshot_id}/stream",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "chapter_id",
      "chapter_snapshot_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Stream Chapter Audio",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "chapter_id": "The ID of the chapter.",
      "chapter_snapshot_id": "The ID of the chapter snapshot.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_project_muted_tracks_endpoint": {
    "accessPath": [
      "getProjectMutedTracksEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/studio/projects/{project_id}/muted-tracks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Project Muted Tracks",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_dubbing_resource": {
    "accessPath": [
      "getDubbingResource"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/dubbing/resource/{dubbing_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get The Dubbing Resource For An Id.",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "add_language": {
    "accessPath": [
      "addLanguage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "language"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/dubbing/resource/{dubbing_id}/language",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add A Language To The Resource",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_clip": {
    "accessPath": [
      "createClip"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "start_time",
      "end_time",
      "text",
      "translations"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/dubbing/resource/{dubbing_id}/speaker/{speaker_id}/segment",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id",
      "speaker_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create A Segment For The Speaker",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "speaker_id": "ID of the speaker.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_segment_language": {
    "accessPath": [
      "updateSegmentLanguage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "start_time",
      "end_time",
      "text"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/dubbing/resource/{dubbing_id}/segment/{segment_id}/{language}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id",
      "segment_id",
      "language"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Modify A Single Segment",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "segment_id": "ID of the segment",
      "language": "ID of the language.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "migrate_segments": {
    "accessPath": [
      "migrateSegments"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "segment_ids",
      "speaker_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/dubbing/resource/{dubbing_id}/migrate-segments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Move Segments Between Speakers",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_segment": {
    "accessPath": [
      "deleteSegment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/dubbing/resource/{dubbing_id}/segment/{segment_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id",
      "segment_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletes A Single Segment",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "segment_id": "ID of the segment",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "transcribe": {
    "accessPath": [
      "transcribe"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "segments"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/dubbing/resource/{dubbing_id}/transcribe",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Transcribes Segments",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "translate": {
    "accessPath": [
      "translate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "segments",
      "languages"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/dubbing/resource/{dubbing_id}/translate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Translates All Or Some Segments And Languages",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "dub": {
    "accessPath": [
      "dub"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "segments",
      "languages"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/dubbing/resource/{dubbing_id}/dub",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Dubs All Or Some Segments And Languages",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_speaker": {
    "accessPath": [
      "updateSpeaker"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "speaker_name",
      "voice_id",
      "voice_stability",
      "voice_similarity",
      "voice_style",
      "languages"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/dubbing/resource/{dubbing_id}/speaker/{speaker_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id",
      "speaker_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Metadata For A Speaker",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "speaker_id": "ID of the speaker.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_speaker": {
    "accessPath": [
      "createSpeaker"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "speaker_name",
      "voice_id",
      "voice_stability",
      "voice_similarity",
      "voice_style"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/dubbing/resource/{dubbing_id}/speaker",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create A New Speaker",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_similar_voices_for_speaker": {
    "accessPath": [
      "getSimilarVoicesForSpeaker"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/dubbing/resource/{dubbing_id}/speaker/{speaker_id}/similar-voices",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id",
      "speaker_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Search The Elevenlabs Library For Voices Similar To A Speaker.",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "speaker_id": "ID of the speaker.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "render": {
    "accessPath": [
      "render"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "render_type",
      "normalize_volume"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/dubbing/resource/{dubbing_id}/render/{language}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id",
      "language"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Render Audio Or Video For The Given Language",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "language": "The target language code to render, eg. 'es'. To render the source track use 'original'.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "list_dubs": {
    "accessPath": [
      "listDubs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/dubbing",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "page_size",
      "dubbing_status",
      "filter_by_creator",
      "order_by",
      "order_direction"
    ],
    "description": "List Dubs",
    "parameterDescriptions": {
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "page_size": "How many dubs to return at maximum. Can not exceed 200, defaults to 100.",
      "dubbing_status": "What state the dub is currently in.",
      "filter_by_creator": "Filters who created the resources being listed, whether it was the user running the request or someone else that shared the resource with them.",
      "order_by": "The field to use for ordering results from this query.",
      "order_direction": "The order direction to use for results from this query.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_dubbing": {
    "accessPath": [
      "createDubbing"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file",
      "csv_file",
      "foreground_audio_file",
      "background_audio_file",
      "name",
      "source_url",
      "source_lang",
      "target_lang",
      "target_accent",
      "num_speakers",
      "watermark",
      "start_time",
      "end_time",
      "highest_resolution",
      "drop_background_audio",
      "use_profanity_filter",
      "dubbing_studio",
      "disable_voice_cloning",
      "mode",
      "csv_fps",
      "hcaptcha_token"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/dubbing",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Dub A Video Or An Audio File",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_dubbed_metadata": {
    "accessPath": [
      "getDubbedMetadata"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/dubbing/{dubbing_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Dubbing",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_dubbing": {
    "accessPath": [
      "deleteDubbing"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/dubbing/{dubbing_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Dubbing",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_dubbed_file": {
    "accessPath": [
      "getDubbedFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/dubbing/{dubbing_id}/audio/{language_code}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id",
      "language_code"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Dubbed File",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "language_code": "ID of the language.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_dubbed_transcript_file": {
    "accessPath": [
      "getDubbedTranscriptFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/dubbing/{dubbing_id}/transcript/{language_code}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id",
      "language_code"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "format_type"
    ],
    "description": "Get Dubbed Transcript",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "language_code": "ISO-693 language code to retrieve the transcript for. Use 'source' to fetch the transcript of the original media.",
      "format_type": "Format to return transcript in. For subtitles use either 'srt' or 'webvtt', and for a full transcript use 'json'. The 'json' format is not yet supported for Dubbing Studio.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_dubbing_transcripts": {
    "accessPath": [
      "getDubbingTranscripts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/dubbing/{dubbing_id}/transcripts/{language_code}/format/{format_type}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dubbing_id",
      "language_code",
      "format_type"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve A Transcript",
    "parameterDescriptions": {
      "dubbing_id": "ID of the dubbing project.",
      "language_code": "ISO-693 language code to retrieve the transcript for. Use 'source' to fetch the transcript of the original media.",
      "format_type": "Format to return transcript in. For subtitles use either 'srt' or 'webvtt', and for a full transcript use 'json'. The 'json' format is not yet supported for Dubbing Studio.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_models": {
    "accessPath": [
      "getModels"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/models",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Models",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_audio_native_project": {
    "accessPath": [
      "createAudioNativeProject"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "image",
      "author",
      "title",
      "small",
      "text_color",
      "background_color",
      "sessionization",
      "voice_id",
      "model_id",
      "file",
      "auto_convert",
      "apply_text_normalization",
      "pronunciation_dictionary_locators"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/audio-native",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Creates Audio Native Enabled Project.",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_audio_native_project_settings_endpoint": {
    "accessPath": [
      "getAudioNativeProjectSettingsEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/audio-native/{project_id}/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Audio Native Project Settings",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "audio_native_project_update_content_endpoint": {
    "accessPath": [
      "audioNativeProjectUpdateContentEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file",
      "auto_convert",
      "auto_publish"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/audio-native/{project_id}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Audio-Native Project Content",
    "parameterDescriptions": {
      "project_id": "The ID of the Studio project.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "audio_native_update_content_from_url": {
    "accessPath": [
      "audioNativeUpdateContentFromUrl"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "url",
      "author",
      "title"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/audio-native/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Audio-Native Content From Url",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_library_voices": {
    "accessPath": [
      "getLibraryVoices"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/shared-voices",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "category",
      "gender",
      "age",
      "accent",
      "language",
      "locale",
      "search",
      "use_cases",
      "descriptives",
      "featured",
      "min_notice_period_days",
      "include_custom_rates",
      "include_live_moderated",
      "reader_app_enabled",
      "owner_id",
      "sort",
      "page"
    ],
    "description": "Get Voices",
    "parameterDescriptions": {
      "page_size": "How many shared voices to return at maximum. Can not exceed 100, defaults to 30.",
      "category": "Voice category used for filtering",
      "gender": "Gender used for filtering",
      "age": "Age used for filtering",
      "accent": "Accent used for filtering",
      "language": "Language used for filtering",
      "locale": "Locale used for filtering",
      "search": "Search term used for filtering",
      "use_cases": "Use-case used for filtering",
      "descriptives": "Search term used for filtering",
      "featured": "Filter featured voices",
      "min_notice_period_days": "Filter voices with a minimum notice period of the given number of days.",
      "include_custom_rates": "Include/exclude voices with custom rates",
      "include_live_moderated": "Include/exclude voices that are live moderated",
      "reader_app_enabled": "Filter voices that are enabled for the reader app",
      "owner_id": "Filter voices by public owner ID",
      "sort": "Sort criteria",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_similar_library_voices": {
    "accessPath": [
      "getSimilarLibraryVoices"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "audio_file",
      "similarity_threshold",
      "top_k"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/similar-voices",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Similar Library Voices",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "usage_characters": {
    "accessPath": [
      "usageCharacters"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/usage/character-stats",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_unix",
      "end_unix",
      "include_workspace_metrics",
      "breakdown_type",
      "aggregation_interval",
      "aggregation_bucket_size",
      "metric"
    ],
    "description": "Get Characters Usage Metrics (Deprecated)",
    "parameterDescriptions": {
      "start_unix": "UTC Unix timestamp for the start of the usage window, in milliseconds. To include the first day of the window, the timestamp should be at 00:00:00 of that day.",
      "end_unix": "UTC Unix timestamp for the end of the usage window, in milliseconds. To include the last day of the window, the timestamp should be at 23:59:59 of that day.",
      "include_workspace_metrics": "Whether or not to include the statistics of the entire workspace.",
      "breakdown_type": "How to break down the information. Cannot be \"user\" if include_workspace_metrics is False.",
      "aggregation_interval": "How to aggregate usage data over time. Can be \"hour\", \"day\", \"week\", \"month\", or \"cumulative\".",
      "aggregation_bucket_size": "Aggregation bucket size in seconds. Overrides the aggregation interval.",
      "metric": "Which metric to aggregate.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "add_from_file": {
    "accessPath": [
      "addFromFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "file",
      "description",
      "workspace_access"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/pronunciation-dictionaries/add-from-file",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add A Pronunciation Dictionary",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "add_from_rules": {
    "accessPath": [
      "addFromRules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "rules",
      "name",
      "description",
      "workspace_access"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/pronunciation-dictionaries/add-from-rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add A Pronunciation Dictionary",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "patch_pronunciation_dictionary": {
    "accessPath": [
      "patchPronunciationDictionary"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "archived",
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/pronunciation-dictionaries/{pronunciation_dictionary_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "pronunciation_dictionary_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Pronunciation Dictionary",
    "parameterDescriptions": {
      "pronunciation_dictionary_id": "The id of the pronunciation dictionary",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_pronunciation_dictionary_metadata": {
    "accessPath": [
      "getPronunciationDictionaryMetadata"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/pronunciation-dictionaries/{pronunciation_dictionary_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "pronunciation_dictionary_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Metadata For A Pronunciation Dictionary",
    "parameterDescriptions": {
      "pronunciation_dictionary_id": "The id of the pronunciation dictionary",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "set_rules": {
    "accessPath": [
      "setRules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "rules"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/pronunciation-dictionaries/{pronunciation_dictionary_id}/set-rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "pronunciation_dictionary_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Set Rules On The Pronunciation Dictionary",
    "parameterDescriptions": {
      "pronunciation_dictionary_id": "The id of the pronunciation dictionary",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "add_rules": {
    "accessPath": [
      "addRules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "rules"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/pronunciation-dictionaries/{pronunciation_dictionary_id}/add-rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "pronunciation_dictionary_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add Rules To The Pronunciation Dictionary",
    "parameterDescriptions": {
      "pronunciation_dictionary_id": "The id of the pronunciation dictionary",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "remove_rules": {
    "accessPath": [
      "removeRules"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "rule_strings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/pronunciation-dictionaries/{pronunciation_dictionary_id}/remove-rules",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "pronunciation_dictionary_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove Rules From The Pronunciation Dictionary",
    "parameterDescriptions": {
      "pronunciation_dictionary_id": "The id of the pronunciation dictionary",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_pronunciation_dictionary_version_pls": {
    "accessPath": [
      "getPronunciationDictionaryVersionPls"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/pronunciation-dictionaries/{dictionary_id}/{version_id}/download",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "dictionary_id",
      "version_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get A Pls File With A Pronunciation Dictionary Version Rules",
    "parameterDescriptions": {
      "dictionary_id": "The id of the pronunciation dictionary",
      "version_id": "The id of the pronunciation dictionary version",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_pronunciation_dictionaries_metadata": {
    "accessPath": [
      "getPronunciationDictionariesMetadata"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/pronunciation-dictionaries",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "page_size",
      "sort",
      "sort_direction"
    ],
    "description": "Get Pronunciation Dictionaries",
    "parameterDescriptions": {
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "page_size": "How many pronunciation dictionaries to return at maximum. Can not exceed 100, defaults to 30.",
      "sort": "Which field to sort by, one of 'created_at_unix' or 'name'.",
      "sort_direction": "Which direction to sort the voices in. 'ascending' or 'descending'.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "revoke": {
    "accessPath": [
      "revoke"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/workspaces/api-keys/revoke",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "api_key_name"
    ],
    "description": "Revoke Api Key",
    "parameterDescriptions": {
      "api_key_name": "Must be set to `self` to revoke the API key used to authenticate this request. Required as an explicit confirmation to avoid accidental revocation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_service_account_api_keys_route": {
    "accessPath": [
      "getServiceAccountApiKeysRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/service-accounts/{service_account_user_id}/api-keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service_account_user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Service Account Api Keys Route",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_service_account_api_key": {
    "accessPath": [
      "createServiceAccountApiKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "permissions",
      "character_limit",
      "allowed_ips"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/service-accounts/{service_account_user_id}/api-keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service_account_user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Service Account Api Key",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "edit_service_account_api_key": {
    "accessPath": [
      "editServiceAccountApiKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "is_enabled",
      "name",
      "permissions",
      "character_limit",
      "allowed_ips"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/service-accounts/{service_account_user_id}/api-keys/{api_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service_account_user_id",
      "api_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Edit Service Account Api Key",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_service_account_api_key": {
    "accessPath": [
      "deleteServiceAccountApiKey"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/service-accounts/{service_account_user_id}/api-keys/{api_key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "service_account_user_id",
      "api_key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Service Account Api Key",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_workspace_audit_logs": {
    "accessPath": [
      "getWorkspaceAuditLogs"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/workspace/audit-logs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "cursor",
      "time_from_unix_ms",
      "time_to_unix_ms",
      "actor_uid",
      "class_name",
      "activity_name"
    ],
    "description": "Get Workspace Audit Logs",
    "parameterDescriptions": {
      "limit": "Maximum number of entries per page",
      "cursor": "Cursor for the next page (from previous response)",
      "time_from_unix_ms": "Only include entries at or after this time (ms since epoch)",
      "time_to_unix_ms": "Only include entries at or before this time (ms since epoch)",
      "actor_uid": "Filter by actor user ID",
      "class_name": "Filter by OCSF event class name (e.g. Account Change)",
      "activity_name": "Filter by audit activity name (e.g. Subscription Creation)",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_auth_connection": {
    "accessPath": [
      "createAuthConnection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/workspace/auth-connections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Workspace Auth Connection",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "list_auth_connections": {
    "accessPath": [
      "listAuthConnections"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/workspace/auth-connections",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Workspace Auth Connections",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_auth_connection": {
    "accessPath": [
      "updateAuthConnection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/workspace/auth-connections/{auth_connection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "auth_connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Workspace Auth Connection",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_auth_connection": {
    "accessPath": [
      "deleteAuthConnection"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/workspace/auth-connections/{auth_connection_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "auth_connection_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Workspace Auth Connection",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_workspace_service_accounts": {
    "accessPath": [
      "getWorkspaceServiceAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/service-accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Workspace Service Accounts",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_groups_endpoint": {
    "accessPath": [
      "getGroupsEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/workspace/groups",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get All Groups",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "search_groups": {
    "accessPath": [
      "searchGroups"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/workspace/groups/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "name"
    ],
    "description": "Search User Groups",
    "parameterDescriptions": {
      "name": "Name of the target group.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "remove_member": {
    "accessPath": [
      "removeMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/workspace/groups/{group_id}/members/remove",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Member From User Group",
    "parameterDescriptions": {
      "group_id": "The ID of the target group.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "add_member": {
    "accessPath": [
      "addMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/workspace/groups/{group_id}/members",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "group_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add Member To User Group",
    "parameterDescriptions": {
      "group_id": "The ID of the target group.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "invite_user": {
    "accessPath": [
      "inviteUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "workspace_permission",
      "seat_type",
      "group_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/workspace/invites/add",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Invite User",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "invite_users_bulk": {
    "accessPath": [
      "inviteUsersBulk"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "emails",
      "seat_type",
      "group_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/workspace/invites/add-bulk",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Invite Multiple Users",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_invite": {
    "accessPath": [
      "deleteInvite"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/workspace/invites",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Existing Invitation",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_workspace_member": {
    "accessPath": [
      "updateWorkspaceMember"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "is_locked",
      "workspace_role",
      "workspace_seat_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/workspace/members",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Member",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_resource_metadata": {
    "accessPath": [
      "getResourceMetadata"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/workspace/resources/{resource_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "resource_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "resource_type"
    ],
    "description": "Get Resource",
    "parameterDescriptions": {
      "resource_id": "The ID of the target resource.",
      "resource_type": "Resource type of the target resource.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "share_resource_endpoint": {
    "accessPath": [
      "shareResourceEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "role",
      "resource_type",
      "user_email",
      "group_id",
      "workspace_api_key_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/workspace/resources/{resource_id}/share",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "resource_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Share Workspace Resource",
    "parameterDescriptions": {
      "resource_id": "The ID of the target resource.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "unshare_resource_endpoint": {
    "accessPath": [
      "unshareResourceEndpoint"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "resource_type",
      "user_email",
      "group_id",
      "workspace_api_key_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/workspace/resources/{resource_id}/unshare",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "resource_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Unshare Workspace Resource",
    "parameterDescriptions": {
      "resource_id": "The ID of the target resource.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_workspace_webhooks_route": {
    "accessPath": [
      "getWorkspaceWebhooksRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/workspace/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_usages"
    ],
    "description": "List Workspace Webhooks",
    "parameterDescriptions": {
      "include_usages": "Whether to include active usages of the webhook, only usable by admins",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_workspace_webhook_route": {
    "accessPath": [
      "createWorkspaceWebhookRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "settings"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/workspace/webhooks",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Workspace Webhook",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "edit_workspace_webhook_route": {
    "accessPath": [
      "editWorkspaceWebhookRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "is_disabled",
      "name",
      "retry_enabled",
      "request_headers"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/workspace/webhooks/{webhook_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Workspace Webhook",
    "parameterDescriptions": {
      "webhook_id": "The unique ID for the webhook",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_workspace_webhook_route": {
    "accessPath": [
      "deleteWorkspaceWebhookRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/workspace/webhooks/{webhook_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "webhook_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Workspace Webhook",
    "parameterDescriptions": {
      "webhook_id": "The unique ID for the webhook",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "speech_to_text": {
    "accessPath": [
      "speechToText"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "model_id",
      "file",
      "language_code",
      "tag_audio_events",
      "num_speakers",
      "timestamps_granularity",
      "diarize",
      "diarization_threshold",
      "additional_formats",
      "file_format",
      "cloud_storage_url",
      "source_url",
      "webhook",
      "webhook_id",
      "temperature",
      "seed",
      "use_multi_channel",
      "webhook_metadata",
      "entity_detection",
      "no_verbatim",
      "detect_speaker_roles",
      "entity_redaction",
      "entity_redaction_mode",
      "keyterms"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/speech-to-text",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "enable_logging"
    ],
    "description": "Speech To Text",
    "parameterDescriptions": {
      "enable_logging": "When enable_logging is set to false zero retention mode will be used for the request. This will mean log and transcript storage features are unavailable for this request. Zero retention mode may only be used by enterprise customers.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_transcript_by_id": {
    "accessPath": [
      "getTranscriptById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/speech-to-text/transcripts/{transcription_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transcription_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Transcript By Id",
    "parameterDescriptions": {
      "transcription_id": "The unique ID of the transcript to retrieve",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_transcript_by_id": {
    "accessPath": [
      "deleteTranscriptById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/speech-to-text/transcripts/{transcription_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "transcription_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Transcript By Id",
    "parameterDescriptions": {
      "transcription_id": "The unique ID of the transcript to delete",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_single_use_token": {
    "accessPath": [
      "getSingleUseToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/single-use-token/{token_type}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "token_type"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Single Use Token",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "forced_alignment": {
    "accessPath": [
      "forcedAlignment"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file",
      "text"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/forced-alignment",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Forced Alignment",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_conversation_signed_link": {
    "accessPath": [
      "getConversationSignedLink"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/conversation/get-signed-url",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "agent_id",
      "include_conversation_id",
      "branch_id",
      "environment"
    ],
    "description": "Get Signed Url",
    "parameterDescriptions": {
      "agent_id": "Agent id (agent_…) or speech engine external id (seng_), resolved to the same underlying resource.",
      "include_conversation_id": "Whether to include a conversation_id with the response. If included, the conversation_signature cannot be used again.",
      "branch_id": "The ID of the branch to use",
      "environment": "The environment to use for resolving environment variables (e.g. 'production', 'staging'). Defaults to 'production'.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_signed_url_deprecated": {
    "accessPath": [
      "getSignedUrlDeprecated"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/conversation/get_signed_url",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "agent_id",
      "include_conversation_id",
      "branch_id",
      "environment"
    ],
    "description": "Get Signed Url",
    "parameterDescriptions": {
      "agent_id": "Agent id (agent_…) or speech engine external id (seng_), resolved to the same underlying resource.",
      "include_conversation_id": "Whether to include a conversation_id with the response. If included, the conversation_signature cannot be used again.",
      "branch_id": "The ID of the branch to use",
      "environment": "The environment to use for resolving environment variables (e.g. 'production', 'staging'). Defaults to 'production'.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_livekit_token": {
    "accessPath": [
      "getLivekitToken"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/conversation/token",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "agent_id",
      "participant_name",
      "branch_id",
      "environment"
    ],
    "description": "Get Webrtc Token",
    "parameterDescriptions": {
      "agent_id": "Agent id (agent_…) or speech engine external id (seng_), resolved to the same underlying resource.",
      "participant_name": "Optional custom participant name. If not provided, user ID will be used",
      "branch_id": "The ID of the branch to use",
      "environment": "The environment to use for resolving environment variables (e.g. 'production', 'staging'). Defaults to 'production'.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "handle_twilio_outbound_call": {
    "accessPath": [
      "handleTwilioOutboundCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "agent_id",
      "agent_phone_number_id",
      "to_number",
      "conversation_initiation_client_data",
      "call_recording_enabled",
      "telephony_call_config"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/twilio/outbound-call",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Handle An Outbound Call Via Twilio",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "register_twilio_call": {
    "accessPath": [
      "registerTwilioCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "agent_id",
      "from_number",
      "to_number",
      "direction",
      "conversation_initiation_client_data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/twilio/register-call",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Register A Twilio Call And Return Twiml",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "handle_exotel_outbound_call": {
    "accessPath": [
      "handleExotelOutboundCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "agent_id",
      "agent_phone_number_id",
      "to_number",
      "conversation_initiation_client_data",
      "telephony_call_config"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/exotel/outbound-call",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Handle An Outbound Call Via Exotel",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "whatsapp_outbound_call": {
    "accessPath": [
      "whatsappOutboundCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "whatsapp_phone_number_id",
      "whatsapp_user_id",
      "whatsapp_call_permission_request_template_name",
      "whatsapp_call_permission_request_template_language_code",
      "agent_id",
      "conversation_initiation_client_data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/whatsapp/outbound-call",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Make An Outbound Call Via Whatsapp",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "whatsapp_outbound_message": {
    "accessPath": [
      "whatsappOutboundMessage"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "whatsapp_phone_number_id",
      "whatsapp_user_id",
      "template_name",
      "template_language_code",
      "template_params",
      "agent_id",
      "conversation_initiation_client_data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/whatsapp/outbound-message",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send An Outbound Message Via Whatsapp",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_agent_route": {
    "accessPath": [
      "createAgentRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "conversation_config",
      "platform_settings",
      "workflow",
      "name",
      "tags"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agents/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "enable_versioning"
    ],
    "description": "Create Agent",
    "parameterDescriptions": {
      "enable_versioning": "Deprecated: all agents are versioned. This parameter is ignored.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_agent_summaries_route": {
    "accessPath": [
      "getAgentSummariesRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/agents/summaries",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "agent_ids"
    ],
    "description": "Get Agent Summaries",
    "parameterDescriptions": {
      "agent_ids": "List of agent IDs to fetch summaries for",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_agent_route": {
    "accessPath": [
      "getAgentRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/agents/{agent_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "version_id",
      "branch_id"
    ],
    "description": "Get Agent",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "version_id": "The ID of the agent version to use",
      "branch_id": "The ID of the branch to use",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "patch_agent_settings_route": {
    "accessPath": [
      "patchAgentSettingsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "conversation_config",
      "platform_settings",
      "workflow",
      "name",
      "tags",
      "version_description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/agents/{agent_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "enable_versioning_if_not_enabled",
      "branch_id"
    ],
    "description": "Patches An Agent Settings",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "enable_versioning_if_not_enabled": "Deprecated: all agents are versioned. This parameter is ignored.",
      "branch_id": "The ID of the branch to use",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_agent_route": {
    "accessPath": [
      "deleteAgentRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/agents/{agent_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Agent",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_agent_widget_route": {
    "accessPath": [
      "getAgentWidgetRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/agents/{agent_id}/widget",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "conversation_signature"
    ],
    "description": "Get Agent Widget Config",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "conversation_signature": "An expiring token that enables a websocket conversation to start. These can be generated for an agent using the /v1/convai/conversation/get-signed-url endpoint",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_agent_link_route": {
    "accessPath": [
      "getAgentLinkRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/agents/{agent_id}/link",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Shareable Agent Link",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "post_agent_avatar_route": {
    "accessPath": [
      "postAgentAvatarRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "avatar_file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agents/{agent_id}/avatar",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Post Agent Avatar",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_agents_route": {
    "accessPath": [
      "getAgentsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/agents",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "search",
      "archived",
      "show_only_owned_agents",
      "created_by_user_id",
      "sort_direction",
      "sort_by",
      "cursor"
    ],
    "description": "List Agents",
    "parameterDescriptions": {
      "page_size": "How many Agents to return at maximum. Can not exceed 100, defaults to 30.",
      "search": "Search by agents name.",
      "archived": "Filter agents by archived status",
      "show_only_owned_agents": "If set to true, the endpoint will omit any agents that were shared with you by someone else and include only the ones you own. Deprecated: use created_by_user_id instead.",
      "created_by_user_id": "Filter agents by creator user ID. When set, only agents created by this user are returned. Takes precedence over show_only_owned_agents. Use '@me' to refer to the authenticated user.",
      "sort_direction": "The direction to sort the results",
      "sort_by": "The field to sort the results by",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_agent_knowledge_base_size": {
    "accessPath": [
      "getAgentKnowledgeBaseSize"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/agent/{agent_id}/knowledge-base/size",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns The Size Of The Agent'S Knowledge Base",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_agent_llm_expected_cost_calculation": {
    "accessPath": [
      "getAgentLlmExpectedCostCalculation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "prompt_length",
      "number_of_pages",
      "rag_enabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agent/{agent_id}/llm-usage/calculate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Calculate Expected Llm Usage For An Agent",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "duplicate_agent_route": {
    "accessPath": [
      "duplicateAgentRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agents/{agent_id}/duplicate",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Duplicate Agent",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "run_conversation_simulation_route": {
    "accessPath": [
      "runConversationSimulationRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "simulation_specification",
      "extra_evaluation_criteria",
      "new_turns_limit"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agents/{agent_id}/simulate-conversation",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Simulates A Conversation",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "run_conversation_simulation_route_stream": {
    "accessPath": [
      "runConversationSimulationRouteStream"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "simulation_specification",
      "extra_evaluation_criteria",
      "new_turns_limit"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agents/{agent_id}/simulate-conversation/stream",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Simulates A Conversation (Stream)",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_agent_response_test_route": {
    "accessPath": [
      "createAgentResponseTestRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agent-testing/create",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Agent Response Test",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_agent_test_folder_route": {
    "accessPath": [
      "createAgentTestFolderRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "parent_folder_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agent-testing/folders",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Agent Test Folder",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_agent_test_folder_route": {
    "accessPath": [
      "getAgentTestFolderRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/agent-testing/folders/{folder_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "folder_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Agent Test Folder By Id",
    "parameterDescriptions": {
      "folder_id": "The folder ID.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_agent_test_folder_route": {
    "accessPath": [
      "updateAgentTestFolderRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/agent-testing/folders/{folder_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "folder_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Agent Test Folder",
    "parameterDescriptions": {
      "folder_id": "The folder ID.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_agent_test_folder_route": {
    "accessPath": [
      "deleteAgentTestFolderRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/agent-testing/folders/{folder_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "folder_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "force"
    ],
    "description": "Delete Agent Test Folder",
    "parameterDescriptions": {
      "folder_id": "The folder ID.",
      "force": "Force delete. Required for deleting non-empty folders.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "agent_testing_bulk_move_route": {
    "accessPath": [
      "agentTestingBulkMoveRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "entity_ids",
      "move_to"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agent-testing/bulk-move",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk Move Tests To Folder",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_agent_response_test_route": {
    "accessPath": [
      "getAgentResponseTestRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/agent-testing/{test_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "test_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Agent Response Test By Id",
    "parameterDescriptions": {
      "test_id": "The id of a chat response test. This is returned on test creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_agent_response_test_route": {
    "accessPath": [
      "updateAgentResponseTestRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PUT",
    "routeTemplate": "/v1/convai/agent-testing/{test_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "test_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Agent Response Test",
    "parameterDescriptions": {
      "test_id": "The id of a chat response test. This is returned on test creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_chat_response_test_route": {
    "accessPath": [
      "deleteChatResponseTestRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/agent-testing/{test_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "test_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Agent Response Test",
    "parameterDescriptions": {
      "test_id": "The id of a chat response test. This is returned on test creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_agent_response_tests_summaries_route": {
    "accessPath": [
      "getAgentResponseTestsSummariesRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "test_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agent-testing/summaries",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Agent Response Test Summaries By Ids",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "list_chat_response_tests_route": {
    "accessPath": [
      "listChatResponseTestsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/agent-testing",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "page_size",
      "search",
      "parent_folder_id",
      "types",
      "include_folders",
      "sort_mode",
      "sharing_mode"
    ],
    "description": "List Agent Response Tests",
    "parameterDescriptions": {
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "page_size": "How many Tests to return at maximum. Can not exceed 100, defaults to 30.",
      "search": "Search query to filter tests by name.",
      "parent_folder_id": "Filter by parent folder ID. Use 'root' to get items in the root folder.",
      "types": "If present, the endpoint will return only tests/folders of the given types.",
      "include_folders": "Deprecated. Use the `types` query param and include `folder` instead.",
      "sort_mode": "Sort mode for listing tests. Use 'folders_first' to place folders before tests.",
      "sharing_mode": "Filter test visibility. Use `shared_with_me` to return only tests/folders shared with the current user that they did not create.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "list_test_invocations_route": {
    "accessPath": [
      "listTestInvocationsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/test-invocations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "agent_id",
      "page_size",
      "cursor"
    ],
    "description": "List Test Invocations",
    "parameterDescriptions": {
      "agent_id": "Filter by agent ID",
      "page_size": "How many Tests to return at maximum. Can not exceed 100, defaults to 30.",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "run_agent_test_suite_route": {
    "accessPath": [
      "runAgentTestSuiteRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "tests",
      "agent_config_override",
      "branch_id",
      "repeat_count"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agents/{agent_id}/run-tests",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Run Tests On The Agent",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_test_invocation_route": {
    "accessPath": [
      "getTestInvocationRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/test-invocations/{test_invocation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "test_invocation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Test Invocation",
    "parameterDescriptions": {
      "test_invocation_id": "The id of a test invocation. This is returned when tests are run.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "resubmit_tests_route": {
    "accessPath": [
      "resubmitTestsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "test_run_ids",
      "agent_config_override",
      "agent_id",
      "branch_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/test-invocations/{test_invocation_id}/resubmit",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "test_invocation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Resubmit Tests",
    "parameterDescriptions": {
      "test_invocation_id": "The id of a test invocation. This is returned when tests are run.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_conversation_histories_route": {
    "accessPath": [
      "getConversationHistoriesRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/conversations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "agent_id",
      "call_successful",
      "call_start_before_unix",
      "call_start_after_unix",
      "call_duration_min_secs",
      "call_duration_max_secs",
      "rating_max",
      "rating_min",
      "has_feedback_comment",
      "user_id",
      "evaluation_params",
      "data_collection_params",
      "tool_names",
      "tool_names_successful",
      "tool_names_errored",
      "main_languages",
      "page_size",
      "summary_mode",
      "search",
      "conversation_initiation_source",
      "text_only",
      "branch_id",
      "topic_ids",
      "exclude_statuses",
      "tag_ids",
      "workflow_node_entered_id"
    ],
    "description": "Get Conversations",
    "parameterDescriptions": {
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "agent_id": "Agent id (agent_…) or speech engine external id (seng_), resolved to the same underlying resource.",
      "call_successful": "The result of the success evaluation",
      "call_start_before_unix": "Unix timestamp (in seconds) to filter conversations up to this start date.",
      "call_start_after_unix": "Unix timestamp (in seconds) to filter conversations after to this start date.",
      "call_duration_min_secs": "Minimum call duration in seconds.",
      "call_duration_max_secs": "Maximum call duration in seconds.",
      "rating_max": "Maximum overall rating (1-5).",
      "rating_min": "Minimum overall rating (1-5).",
      "has_feedback_comment": "Filter conversations with user feedback comments.",
      "user_id": "Filter conversations by the user ID who initiated them.",
      "evaluation_params": "Evaluation filters. Repeat param. Format: criteria_id:result. Example: eval=value_framing:success",
      "data_collection_params": "Data collection filters. Repeat param. Format: id:op:value where op is one of eq|neq|gt|gte|lt|lte|in|exists|missing. For in, pipe-delimit values.",
      "tool_names": "Filter conversations by tool names used during the call.",
      "tool_names_successful": "Filter conversations by tool names that had successful calls.",
      "tool_names_errored": "Filter conversations by tool names that had errored calls.",
      "main_languages": "Filter conversations by detected main language (language code).",
      "page_size": "How many conversations to return at maximum. Can not exceed 100, defaults to 30.",
      "summary_mode": "Whether to include transcript summaries in the response.",
      "search": "Full-text or fuzzy search over transcript messages",
      "branch_id": "Filter conversations by branch ID.",
      "topic_ids": "Filter conversations by topic IDs assigned during topic discovery.",
      "exclude_statuses": "Exclude conversations with the given statuses. Useful for hiding in-progress / processing conversations from list views.",
      "tag_ids": "Filter conversations by conversation tag IDs assigned via the conversation-tags endpoints.",
      "workflow_node_entered_id": "Filter conversations to only those that entered the given node.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_conversation_users_route": {
    "accessPath": [
      "getConversationUsersRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "agent_id",
      "branch_id",
      "call_start_before_unix",
      "call_start_after_unix",
      "search",
      "page_size",
      "sort_by",
      "cursor"
    ],
    "description": "Get Conversation Users",
    "parameterDescriptions": {
      "agent_id": "Agent id (agent_…) or speech engine external id (seng_), resolved to the same underlying resource.",
      "branch_id": "Filter conversations by branch ID.",
      "call_start_before_unix": "Unix timestamp (in seconds) to filter conversations up to this start date.",
      "call_start_after_unix": "Unix timestamp (in seconds) to filter conversations after to this start date.",
      "search": "Search/filter by user ID (exact match).",
      "page_size": "How many users to return at maximum. Defaults to 30.",
      "sort_by": "The field to sort the results by. Defaults to last_contact_unix_secs.",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_conversation_history_route": {
    "accessPath": [
      "getConversationHistoryRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/conversations/{conversation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "format"
    ],
    "description": "Get Conversation Details",
    "parameterDescriptions": {
      "conversation_id": "The id of the conversation you're taking the action on.",
      "format": "Response format. Defaults to 'json'. Set to 'opentelemetry' for an OTLP-compatible trace payload using the same structure as the post-call webhook.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_conversation_route": {
    "accessPath": [
      "deleteConversationRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/conversations/{conversation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Conversation",
    "parameterDescriptions": {
      "conversation_id": "The id of the conversation you're taking the action on.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_conversation_sip_messages": {
    "accessPath": [
      "getConversationSipMessages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/conversations/{conversation_id}/sip-messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "cursor"
    ],
    "description": "Get Sip Messages For A Conversation",
    "parameterDescriptions": {
      "conversation_id": "The id of the conversation you're taking the action on.",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_conversation_audio_route": {
    "accessPath": [
      "getConversationAudioRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/conversations/{conversation_id}/audio",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Conversation Audio",
    "parameterDescriptions": {
      "conversation_id": "The id of the conversation you're taking the action on.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "post_conversation_feedback_route": {
    "accessPath": [
      "postConversationFeedbackRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "feedback"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/convai/conversations/{conversation_id}/feedback",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Send Conversation Feedback",
    "parameterDescriptions": {
      "conversation_id": "The id of the conversation you're taking the action on."
    }
  },
  "text_search_conversation_messages_route": {
    "accessPath": [
      "textSearchConversationMessagesRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/conversations/messages/text-search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "text_query",
      "agent_id",
      "call_successful",
      "call_start_before_unix",
      "call_start_after_unix",
      "call_duration_min_secs",
      "call_duration_max_secs",
      "rating_max",
      "rating_min",
      "has_feedback_comment",
      "user_id",
      "evaluation_params",
      "data_collection_params",
      "tool_names",
      "tool_names_successful",
      "tool_names_errored",
      "main_languages",
      "page_size",
      "summary_mode",
      "conversation_initiation_source",
      "text_only",
      "branch_id",
      "topic_ids",
      "sort_by",
      "cursor"
    ],
    "description": "Text Search Conversation Messages",
    "parameterDescriptions": {
      "text_query": "The search query text for full-text and fuzzy matching",
      "agent_id": "Agent id (agent_…) or speech engine external id (seng_), resolved to the same underlying resource.",
      "call_successful": "The result of the success evaluation",
      "call_start_before_unix": "Unix timestamp (in seconds) to filter conversations up to this start date.",
      "call_start_after_unix": "Unix timestamp (in seconds) to filter conversations after to this start date.",
      "call_duration_min_secs": "Minimum call duration in seconds.",
      "call_duration_max_secs": "Maximum call duration in seconds.",
      "rating_max": "Maximum overall rating (1-5).",
      "rating_min": "Minimum overall rating (1-5).",
      "has_feedback_comment": "Filter conversations with user feedback comments.",
      "user_id": "Filter conversations by the user ID who initiated them.",
      "evaluation_params": "Evaluation filters. Repeat param. Format: criteria_id:result. Example: eval=value_framing:success",
      "data_collection_params": "Data collection filters. Repeat param. Format: id:op:value where op is one of eq|neq|gt|gte|lt|lte|in|exists|missing. For in, pipe-delimit values.",
      "tool_names": "Filter conversations by tool names used during the call.",
      "tool_names_successful": "Filter conversations by tool names that had successful calls.",
      "tool_names_errored": "Filter conversations by tool names that had errored calls.",
      "main_languages": "Filter conversations by detected main language (language code).",
      "page_size": "Number of results per page. Max 50.",
      "summary_mode": "Whether to include transcript summaries in the response.",
      "branch_id": "Filter conversations by branch ID.",
      "topic_ids": "Filter conversations by topic IDs assigned during topic discovery.",
      "sort_by": "Sort order for search results. 'search_score' sorts by search score, 'created_at' sorts by conversation start time.",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "smart_search_conversation_messages_route": {
    "accessPath": [
      "smartSearchConversationMessagesRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/conversations/messages/smart-search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "text_query",
      "agent_id",
      "page_size",
      "cursor"
    ],
    "description": "Smart Search Conversation Messages",
    "parameterDescriptions": {
      "text_query": "The search query text for semantic similarity matching",
      "agent_id": "Agent id (agent_…) or speech engine external id (seng_), resolved to the same underlying resource.",
      "page_size": "Number of results per page. Max 50.",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "assign_conversation_tags_route": {
    "accessPath": [
      "assignConversationTagsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "tag_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/conversations/{conversation_id}/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Assign Conversation Tags",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "unassign_conversation_tag_route": {
    "accessPath": [
      "unassignConversationTagRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/conversations/{conversation_id}/tags/{tag_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id",
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Unassign Conversation Tag",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "list_conversation_tags_route": {
    "accessPath": [
      "listConversationTagsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "cursor"
    ],
    "description": "List Conversation Tags",
    "parameterDescriptions": {
      "page_size": "How many conversation tags to return. Can not exceed 100.",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_conversation_tag_route": {
    "accessPath": [
      "createConversationTagRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/tags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Conversation Tag",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_conversation_tag_route": {
    "accessPath": [
      "getConversationTagRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/tags/{tag_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Conversation Tag",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_conversation_tag_route": {
    "accessPath": [
      "updateConversationTagRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "title",
      "description"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/tags/{tag_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Conversation Tag",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_conversation_tag_route": {
    "accessPath": [
      "deleteConversationTagRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/tags/{tag_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tag_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Conversation Tag",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_phone_number_route": {
    "accessPath": [
      "createPhoneNumberRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/phone-numbers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Import Phone Number",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "list_phone_numbers_route": {
    "accessPath": [
      "listPhoneNumbersRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/phone-numbers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Phone Numbers",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_phone_number_route": {
    "accessPath": [
      "getPhoneNumberRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/phone-numbers/{phone_number_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "phone_number_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Phone Number",
    "parameterDescriptions": {
      "phone_number_id": "The id of an agent. This is returned on agent creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_phone_number_route": {
    "accessPath": [
      "deletePhoneNumberRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/phone-numbers/{phone_number_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "phone_number_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Phone Number",
    "parameterDescriptions": {
      "phone_number_id": "The id of an agent. This is returned on agent creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_phone_number_route": {
    "accessPath": [
      "updatePhoneNumberRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "agent_id",
      "label",
      "inbound_trunk_config",
      "outbound_trunk_config",
      "livekit_stack",
      "store_sip_messages",
      "environment",
      "branch_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/phone-numbers/{phone_number_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "phone_number_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Phone Number",
    "parameterDescriptions": {
      "phone_number_id": "The id of an agent. This is returned on agent creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "list_sip_messages": {
    "accessPath": [
      "listSipMessages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/phone-numbers/{phone_number_id}/sip-messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "phone_number_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "cursor"
    ],
    "description": "Get Sip Messages For A Phone Number",
    "parameterDescriptions": {
      "phone_number_id": "The id of an agent. This is returned on agent creation.",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_public_llm_expected_cost_calculation": {
    "accessPath": [
      "getPublicLlmExpectedCostCalculation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "prompt_length",
      "number_of_pages",
      "rag_enabled"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/convai/llm-usage/calculate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Calculate Expected Llm Usage"
  },
  "list_available_llms": {
    "accessPath": [
      "listAvailableLlms"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/llm/list",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Available Llms",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "upload_file_route": {
    "accessPath": [
      "uploadFileRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/conversations/{conversation_id}/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Upload File",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "cancel_file_upload_route": {
    "accessPath": [
      "cancelFileUploadRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/conversations/{conversation_id}/files/{file_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_id",
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete File Upload",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_live_count": {
    "accessPath": [
      "getLiveCount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/analytics/live-count",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "agent_id"
    ],
    "description": "Get Live Count",
    "parameterDescriptions": {
      "agent_id": "The id of an agent to restrict the analytics to.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_agent_knowledge_base_summaries_route": {
    "accessPath": [
      "getAgentKnowledgeBaseSummariesRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/knowledge-base/summaries",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "document_ids"
    ],
    "description": "Get Knowledge Base Summaries By Ids",
    "parameterDescriptions": {
      "document_ids": "The ids of knowledge base documents.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "add_documentation_to_knowledge_base": {
    "accessPath": [
      "addDocumentationToKnowledgeBase"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "url",
      "file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/knowledge-base",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "agent_id"
    ],
    "description": "Add To Knowledge Base",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_knowledge_base_list_route": {
    "accessPath": [
      "getKnowledgeBaseListRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/knowledge-base",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "search",
      "show_only_owned_documents",
      "created_by_user_id",
      "types",
      "parent_folder_id",
      "ancestor_folder_id",
      "folders_first",
      "sort_direction",
      "sort_by",
      "cursor"
    ],
    "description": "Get Knowledge Base List",
    "parameterDescriptions": {
      "page_size": "How many documents to return at maximum. Can not exceed 100, defaults to 30.",
      "search": "If specified, the endpoint returns only such knowledge base documents whose names start with this string.",
      "show_only_owned_documents": "If set to true, the endpoint will return only documents owned by you (and not shared from somebody else). Deprecated: use created_by_user_id instead.",
      "created_by_user_id": "Filter documents by creator user ID. When set, only documents created by this user are returned. Takes precedence over show_only_owned_documents. Use '@me' to refer to the authenticated user.",
      "types": "If present, the endpoint will return only documents of the given types.",
      "parent_folder_id": "If set, the endpoint will return only documents that are direct children of the given folder.",
      "ancestor_folder_id": "If set, the endpoint will return only documents that are descendants of the given folder.",
      "folders_first": "Whether folders should be returned first in the list of documents.",
      "sort_direction": "The direction to sort the results",
      "sort_by": "The field to sort the results by",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_url_document_route": {
    "accessPath": [
      "createUrlDocumentRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "url",
      "name",
      "parent_folder_id",
      "enable_auto_sync",
      "auto_remove"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/knowledge-base/url",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Url Document",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_file_document_route": {
    "accessPath": [
      "createFileDocumentRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file",
      "name",
      "parent_folder_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/knowledge-base/file",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create File Document",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_text_document_route": {
    "accessPath": [
      "createTextDocumentRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "text",
      "name",
      "parent_folder_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/knowledge-base/text",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Text Document",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_folder_route": {
    "accessPath": [
      "createFolderRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "parent_folder_id",
      "enable_auto_sync",
      "auto_remove"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/knowledge-base/folder",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Folder",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_document_route": {
    "accessPath": [
      "updateDocumentRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "content"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/knowledge-base/{documentation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Document",
    "parameterDescriptions": {
      "documentation_id": "The id of a document from the knowledge base. This is returned on document addition.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_documentation_from_knowledge_base": {
    "accessPath": [
      "getDocumentationFromKnowledgeBase"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/knowledge-base/{documentation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "agent_id"
    ],
    "description": "Get Documentation From Knowledge Base",
    "parameterDescriptions": {
      "documentation_id": "The id of a document from the knowledge base. This is returned on document addition.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_knowledge_base_document": {
    "accessPath": [
      "deleteKnowledgeBaseDocument"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/knowledge-base/{documentation_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "force"
    ],
    "description": "Delete Knowledge Base Document Or Folder",
    "parameterDescriptions": {
      "documentation_id": "The id of a document from the knowledge base. This is returned on document addition.",
      "force": "If set to true, the document or folder will be deleted regardless of whether it is used by any agents and it will be removed from the dependent agents. For non-empty folders, this will also delete all child documents and folders.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_file_document_route": {
    "accessPath": [
      "updateFileDocumentRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/knowledge-base/{documentation_id}/update-file",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update File Document",
    "parameterDescriptions": {
      "documentation_id": "The id of a document from the knowledge base. This is returned on document addition.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_or_create_rag_indexes": {
    "accessPath": [
      "getOrCreateRagIndexes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "items"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/knowledge-base/rag-index",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Compute Rag Indexes In Batch",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_rag_index_overview": {
    "accessPath": [
      "getRagIndexOverview"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/knowledge-base/rag-index",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Rag Index Overview.",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "refresh_url_document_route": {
    "accessPath": [
      "refreshUrlDocumentRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/knowledge-base/{documentation_id}/refresh",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Refresh Url Document Content",
    "parameterDescriptions": {
      "documentation_id": "The id of a document from the knowledge base. This is returned on document addition.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "rag_index_status": {
    "accessPath": [
      "ragIndexStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "model"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/knowledge-base/{documentation_id}/rag-index",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Compute Rag Index.",
    "parameterDescriptions": {
      "documentation_id": "The id of a document from the knowledge base. This is returned on document addition.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_rag_indexes": {
    "accessPath": [
      "getRagIndexes"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/knowledge-base/{documentation_id}/rag-index",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Rag Indexes Of The Specified Knowledgebase Document.",
    "parameterDescriptions": {
      "documentation_id": "The id of a document from the knowledge base. This is returned on document addition.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_rag_index": {
    "accessPath": [
      "deleteRagIndex"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/knowledge-base/{documentation_id}/rag-index/{rag_index_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentation_id",
      "rag_index_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Rag Index.",
    "parameterDescriptions": {
      "documentation_id": "The id of a document from the knowledge base. This is returned on document addition.",
      "rag_index_id": "The id of RAG index of document from the knowledge base.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "search_knowledge_base_content_route": {
    "accessPath": [
      "searchKnowledgeBaseContentRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/knowledge-base/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "query",
      "page_size",
      "types",
      "cursor"
    ],
    "description": "Search Knowledge Base Content",
    "parameterDescriptions": {
      "query": "The search query text",
      "page_size": "How many documents to return at maximum. Can not exceed 100, defaults to 30.",
      "types": "If present, the endpoint will return only documents of the given types.",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_knowledge_base_dependent_agents": {
    "accessPath": [
      "getKnowledgeBaseDependentAgents"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/knowledge-base/{documentation_id}/dependent-agents",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "dependent_type",
      "page_size",
      "cursor"
    ],
    "description": "Get Dependent Agents List",
    "parameterDescriptions": {
      "documentation_id": "The id of a document from the knowledge base. This is returned on document addition.",
      "dependent_type": "Type of dependent agents to return.",
      "page_size": "How many documents to return at maximum. Can not exceed 100, defaults to 30.",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_knowledge_base_content": {
    "accessPath": [
      "getKnowledgeBaseContent"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/knowledge-base/{documentation_id}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Document Content",
    "parameterDescriptions": {
      "documentation_id": "The id of a document from the knowledge base. This is returned on document addition.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_knowledge_base_source_file_url": {
    "accessPath": [
      "getKnowledgeBaseSourceFileUrl"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/knowledge-base/{documentation_id}/source-file-url",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Document Source File Url",
    "parameterDescriptions": {
      "documentation_id": "The id of a document from the knowledge base. This is returned on document addition.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_documentation_chunk_from_knowledge_base": {
    "accessPath": [
      "getDocumentationChunkFromKnowledgeBase"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/knowledge-base/{documentation_id}/chunk/{chunk_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentation_id",
      "chunk_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "embedding_model"
    ],
    "description": "Get Documentation Chunk From Knowledge Base",
    "parameterDescriptions": {
      "documentation_id": "The id of a document from the knowledge base. This is returned on document addition.",
      "chunk_id": "The id of a document RAG chunk from the knowledge base.",
      "embedding_model": "The embedding model used to retrieve the chunk.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_documentation_chunks_from_knowledge_base": {
    "accessPath": [
      "getDocumentationChunksFromKnowledgeBase"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/knowledge-base/{documentation_id}/chunks",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "documentation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "embedding_model",
      "page_size",
      "cursor"
    ],
    "description": "Get All Rag Chunks For A Document",
    "parameterDescriptions": {
      "documentation_id": "The id of a document from the knowledge base. This is returned on document addition.",
      "embedding_model": "The embedding model used to retrieve the chunk.",
      "page_size": "How many documents to return at maximum. Can not exceed 100, defaults to 30.",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "post_knowledge_base_move_route": {
    "accessPath": [
      "postKnowledgeBaseMoveRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "move_to"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/knowledge-base/{document_id}/move",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "document_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Move Entity To Folder",
    "parameterDescriptions": {
      "document_id": "The id of a document from the knowledge base. This is returned on document addition.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "post_knowledge_base_bulk_move_route": {
    "accessPath": [
      "postKnowledgeBaseBulkMoveRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "document_ids",
      "move_to"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/knowledge-base/bulk-move",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Bulk Move Entities To Folder",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_agent_topics_route": {
    "accessPath": [
      "getAgentTopicsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/agents/{agent_id}/topics",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Agent Conversation Topics",
    "parameterDescriptions": {
      "agent_id": "ID of the agent",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "add_tool_route": {
    "accessPath": [
      "addToolRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "tool_config",
      "response_mocks"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/tools",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add Tool",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_tools_route": {
    "accessPath": [
      "getToolsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/tools",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "search",
      "page_size",
      "show_only_owned_documents",
      "created_by_user_id",
      "types",
      "sort_direction",
      "sort_by",
      "cursor"
    ],
    "description": "Get Tools",
    "parameterDescriptions": {
      "search": "If specified, the endpoint returns only tools whose names start with this string.",
      "page_size": "How many documents to return at maximum. Can not exceed 100, defaults to 30.",
      "show_only_owned_documents": "If set to true, the endpoint will return only tools owned by you (and not shared from somebody else). Deprecated: use created_by_user_id instead.",
      "created_by_user_id": "Filter tools by creator user ID. When set, only tools created by this user are returned. Takes precedence over show_only_owned_documents. Use '@me' to refer to the authenticated user.",
      "types": "If present, the endpoint will return only tools of the given types.",
      "sort_direction": "The direction to sort the results",
      "sort_by": "The field to sort the results by",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_tool_route": {
    "accessPath": [
      "getToolRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/tools/{tool_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tool_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Tool",
    "parameterDescriptions": {
      "tool_id": "ID of the requested tool.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_tool_route": {
    "accessPath": [
      "updateToolRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "tool_config",
      "response_mocks"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/tools/{tool_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tool_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Tool",
    "parameterDescriptions": {
      "tool_id": "ID of the requested tool.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_tool_route": {
    "accessPath": [
      "deleteToolRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/tools/{tool_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tool_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "force"
    ],
    "description": "Delete Tool",
    "parameterDescriptions": {
      "tool_id": "ID of the requested tool.",
      "force": "If set to true, the tool will be deleted regardless of whether it is used by any agents and it will be removed from the dependent agents and branches.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_tool_dependent_agents_route": {
    "accessPath": [
      "getToolDependentAgentsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/tools/{tool_id}/dependent-agents",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tool_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "page_size"
    ],
    "description": "Get Dependent Agents List",
    "parameterDescriptions": {
      "tool_id": "ID of the requested tool.",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "page_size": "How many documents to return at maximum. Can not exceed 100, defaults to 30.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_tool_executions_route": {
    "accessPath": [
      "getToolExecutionsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/tools/{tool_id}/executions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "tool_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "page_size",
      "is_error",
      "agent_id",
      "branch_id",
      "start_time",
      "end_time"
    ],
    "description": "Get Tool Executions",
    "parameterDescriptions": {
      "tool_id": "ID of the requested tool.",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "page_size": "How many documents to return at maximum. Can not exceed 100, defaults to 30.",
      "is_error": "Filter by error status. If not provided, returns all executions.",
      "agent_id": "Filter by agent ID.",
      "branch_id": "Filter by agent branch ID.",
      "start_time": "Filter executions from this Unix timestamp (inclusive).",
      "end_time": "Filter executions until this Unix timestamp (inclusive).",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_settings_route": {
    "accessPath": [
      "getSettingsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Convai Settings",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_settings_route": {
    "accessPath": [
      "updateSettingsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "conversation_initiation_client_data_webhook",
      "webhooks",
      "can_use_mcp_servers",
      "rag_retention_period_days",
      "conversation_embedding_retention_days",
      "default_livekit_stack"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/settings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Convai Settings",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_dashboard_settings_route": {
    "accessPath": [
      "getDashboardSettingsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/settings/dashboard",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Convai Dashboard Settings",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_dashboard_settings_route": {
    "accessPath": [
      "updateDashboardSettingsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "charts"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/settings/dashboard",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Convai Dashboard Settings",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_secret_route": {
    "accessPath": [
      "createSecretRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "type",
      "name",
      "value"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/secrets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Convai Workspace Secret",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_secrets_route": {
    "accessPath": [
      "getSecretsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/secrets",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "dependency_limit",
      "search",
      "cursor"
    ],
    "description": "Get Convai Workspace Secrets",
    "parameterDescriptions": {
      "page_size": "How many documents to return at maximum. Can not exceed 100. If not provided, returns all secrets.",
      "dependency_limit": "Maximum number of dependent resources (tools, agents, phone numbers) to return per secret. Can not exceed 100.",
      "search": "If specified, returns only secrets whose names start with this string.",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_secret_route": {
    "accessPath": [
      "getSecretRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/secrets/{secret_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "secret_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Convai Workspace Secret",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_secret_route": {
    "accessPath": [
      "deleteSecretRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/secrets/{secret_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "secret_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Convai Workspace Secret",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_secret_route": {
    "accessPath": [
      "updateSecretRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "type",
      "name",
      "value"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/secrets/{secret_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "secret_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Convai Workspace Secret",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_secret_dependencies_route": {
    "accessPath": [
      "getSecretDependenciesRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/secrets/{secret_id}/dependencies/{resource_type}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "secret_id",
      "resource_type"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "cursor"
    ],
    "description": "Get Secret Dependencies By Type",
    "parameterDescriptions": {
      "page_size": "How many dependency items to return per page.",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_batch_call": {
    "accessPath": [
      "createBatchCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "call_name",
      "agent_id",
      "recipients",
      "scheduled_time_unix",
      "agent_phone_number_id",
      "whatsapp_params",
      "timezone",
      "branch_id",
      "environment",
      "telephony_call_config",
      "target_concurrency_limit"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/batch-calling/submit",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Submit A Batch Call Request.",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_workspace_batch_calls": {
    "accessPath": [
      "getWorkspaceBatchCalls"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/batch-calling/workspace",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "last_doc",
      "agent_id"
    ],
    "description": "Get All Batch Calls For A Workspace.",
    "parameterDescriptions": {
      "agent_id": "Filter batch calls to a single agent.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_batch_call": {
    "accessPath": [
      "getBatchCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/batch-calling/{batch_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "batch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get A Batch Call By Id.",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_batch_call": {
    "accessPath": [
      "deleteBatchCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/batch-calling/{batch_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "batch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete A Batch Call.",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "cancel_batch_call": {
    "accessPath": [
      "cancelBatchCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/batch-calling/{batch_id}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "batch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Cancel A Batch Call.",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "retry_batch_call": {
    "accessPath": [
      "retryBatchCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/batch-calling/{batch_id}/retry",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "batch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retry A Batch Call.",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "handle_sip_trunk_outbound_call": {
    "accessPath": [
      "handleSipTrunkOutboundCall"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "agent_id",
      "agent_phone_number_id",
      "to_number",
      "conversation_initiation_client_data",
      "telephony_call_config"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/sip-trunk/outbound-call",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Handle An Outbound Call Via Sip Trunk",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_mcp_server_route": {
    "accessPath": [
      "createMcpServerRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "config"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/mcp-servers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Mcp Server",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "list_mcp_servers_route": {
    "accessPath": [
      "listMcpServersRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/mcp-servers",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Mcp Servers",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_mcp_route": {
    "accessPath": [
      "getMcpRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/mcp-servers/{mcp_server_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "mcp_server_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Mcp Server",
    "parameterDescriptions": {
      "mcp_server_id": "ID of the MCP Server.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_mcp_server_route": {
    "accessPath": [
      "deleteMcpServerRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/mcp-servers/{mcp_server_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "mcp_server_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Mcp Server",
    "parameterDescriptions": {
      "mcp_server_id": "ID of the MCP Server.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_mcp_server_config_route": {
    "accessPath": [
      "updateMcpServerConfigRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "approval_policy",
      "force_pre_tool_speech",
      "pre_tool_speech",
      "disable_interruptions",
      "tool_call_sound",
      "tool_call_sound_behavior",
      "execution_mode",
      "response_timeout_secs",
      "request_headers",
      "disable_compression",
      "secret_token",
      "auth_connection"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/mcp-servers/{mcp_server_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "mcp_server_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Mcp Server Configuration",
    "parameterDescriptions": {
      "mcp_server_id": "ID of the MCP Server.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "list_mcp_server_tools_route": {
    "accessPath": [
      "listMcpServerToolsRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/mcp-servers/{mcp_server_id}/tools",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "mcp_server_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Mcp Server Tools",
    "parameterDescriptions": {
      "mcp_server_id": "ID of the MCP Server.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_mcp_server_approval_policy_route": {
    "accessPath": [
      "updateMcpServerApprovalPolicyRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "approval_policy"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/mcp-servers/{mcp_server_id}/approval-policy",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "mcp_server_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Mcp Server Approval Policy",
    "parameterDescriptions": {
      "mcp_server_id": "ID of the MCP Server.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "add_mcp_server_tool_approval_route": {
    "accessPath": [
      "addMcpServerToolApprovalRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "tool_name",
      "tool_description",
      "input_schema",
      "approval_policy"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/mcp-servers/{mcp_server_id}/tool-approvals",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "mcp_server_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Mcp Server Tool Approval",
    "parameterDescriptions": {
      "mcp_server_id": "ID of the MCP Server.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "remove_mcp_server_tool_approval_route": {
    "accessPath": [
      "removeMcpServerToolApprovalRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/mcp-servers/{mcp_server_id}/tool-approvals/{tool_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "mcp_server_id",
      "tool_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Mcp Server Tool Approval",
    "parameterDescriptions": {
      "mcp_server_id": "ID of the MCP Server.",
      "tool_name": "Name of the MCP tool to remove approval for.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "add_mcp_tool_config_override_route": {
    "accessPath": [
      "addMcpToolConfigOverrideRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "force_pre_tool_speech",
      "pre_tool_speech",
      "disable_interruptions",
      "tool_call_sound",
      "tool_call_sound_behavior",
      "execution_mode",
      "response_timeout_secs",
      "assignments",
      "input_overrides",
      "response_mocks",
      "tool_name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/mcp-servers/{mcp_server_id}/tool-configs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "mcp_server_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Mcp Tool Configuration Override",
    "parameterDescriptions": {
      "mcp_server_id": "ID of the MCP Server.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_mcp_tool_config_override_route": {
    "accessPath": [
      "getMcpToolConfigOverrideRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/mcp-servers/{mcp_server_id}/tool-configs/{tool_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "mcp_server_id",
      "tool_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Mcp Tool Configuration Override",
    "parameterDescriptions": {
      "mcp_server_id": "ID of the MCP Server.",
      "tool_name": "Name of the MCP tool to retrieve config overrides for.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_mcp_tool_config_override_route": {
    "accessPath": [
      "updateMcpToolConfigOverrideRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "force_pre_tool_speech",
      "pre_tool_speech",
      "disable_interruptions",
      "tool_call_sound",
      "tool_call_sound_behavior",
      "execution_mode",
      "response_timeout_secs",
      "assignments",
      "input_overrides",
      "response_mocks"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/mcp-servers/{mcp_server_id}/tool-configs/{tool_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "mcp_server_id",
      "tool_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Mcp Tool Configuration Override",
    "parameterDescriptions": {
      "mcp_server_id": "ID of the MCP Server.",
      "tool_name": "Name of the MCP tool to update config overrides for.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "remove_mcp_tool_config_override_route": {
    "accessPath": [
      "removeMcpToolConfigOverrideRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/mcp-servers/{mcp_server_id}/tool-configs/{tool_name}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "mcp_server_id",
      "tool_name"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Mcp Tool Configuration Override",
    "parameterDescriptions": {
      "mcp_server_id": "ID of the MCP Server.",
      "tool_name": "Name of the MCP tool to remove config overrides for.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_whatsapp_account": {
    "accessPath": [
      "getWhatsappAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/whatsapp-accounts/{phone_number_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "phone_number_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Whatsapp Account",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_whatsapp_account": {
    "accessPath": [
      "updateWhatsappAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "assigned_agent_id",
      "enable_messaging",
      "enable_audio_message_response"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/whatsapp-accounts/{phone_number_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "phone_number_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Whatsapp Account",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_whatsapp_account": {
    "accessPath": [
      "deleteWhatsappAccount"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/whatsapp-accounts/{phone_number_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "phone_number_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Whatsapp Account",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "list_whatsapp_accounts": {
    "accessPath": [
      "listWhatsappAccounts"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/whatsapp-accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Whatsapp Accounts",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_branch_route": {
    "accessPath": [
      "createBranchRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "parent_version_id",
      "name",
      "description",
      "conversation_config",
      "platform_settings",
      "workflow"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agents/{agent_id}/branches",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create A New Branch",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_branches_route": {
    "accessPath": [
      "getBranchesRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/agents/{agent_id}/branches",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include_archived",
      "limit"
    ],
    "description": "List Agent Branches",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "include_archived": "Whether archived branches should be included",
      "limit": "How many results at most should be returned",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_branch_route": {
    "accessPath": [
      "getBranchRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/agents/{agent_id}/branches/{branch_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id",
      "branch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Agent Branch",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "branch_id": "Unique identifier for the branch.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_branch_route": {
    "accessPath": [
      "updateBranchRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "is_archived",
      "protection_status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/agents/{agent_id}/branches/{branch_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id",
      "branch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Agent Branch",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "branch_id": "Unique identifier for the branch.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_version_metadata_route": {
    "accessPath": [
      "getVersionMetadataRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/agents/{agent_id}/versions/{version_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id",
      "version_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Agent Version Metadata",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "version_id": "Unique identifier for the version.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "merge_branch_into_target": {
    "accessPath": [
      "mergeBranchIntoTarget"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "archive_source_branch",
      "force"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agents/{agent_id}/branches/{source_branch_id}/merge",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id",
      "source_branch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "target_branch_id"
    ],
    "description": "Merge A Branch Into A Target Branch",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "source_branch_id": "Unique identifier for the source branch to merge from.",
      "target_branch_id": "The ID of the target branch to merge into.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_agent_deployment_route": {
    "accessPath": [
      "createAgentDeploymentRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "deployment_request"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agents/{agent_id}/deployments",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Or Update Deployments",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_agent_draft_route": {
    "accessPath": [
      "createAgentDraftRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "conversation_config",
      "platform_settings",
      "workflow",
      "name",
      "tags"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/agents/{agent_id}/drafts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "branch_id"
    ],
    "description": "Create Agent Draft",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "branch_id": "The ID of the agent branch to use",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_agent_draft_route": {
    "accessPath": [
      "deleteAgentDraftRoute"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/convai/agents/{agent_id}/drafts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "agent_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "branch_id"
    ],
    "description": "Delete Agent Draft",
    "parameterDescriptions": {
      "agent_id": "The id of an agent. This is returned on agent creation.",
      "branch_id": "The ID of the agent branch to use",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "list_speech_engines": {
    "accessPath": [
      "listSpeechEngines"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/speech-engine",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "search",
      "sort_direction",
      "sort_by",
      "cursor"
    ],
    "description": "List Speech Engines",
    "parameterDescriptions": {
      "page_size": "How many Speech Engines to return at maximum. Can not exceed 100, defaults to 30.",
      "search": "Search term to filter Speech Engines by name",
      "sort_direction": "The direction to sort the results",
      "sort_by": "The field to sort the results by",
      "cursor": "Used for fetching next page. Cursor is returned in the response.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_speech_engine": {
    "accessPath": [
      "createSpeechEngine"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "speech_engine",
      "asr",
      "tts",
      "turn",
      "conversation",
      "privacy",
      "call_limits",
      "language",
      "tags",
      "overrides"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/speech-engine",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Speech Engine",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_speech_engine": {
    "accessPath": [
      "getSpeechEngine"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/speech-engine/{speech_engine_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "speech_engine_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Speech Engine",
    "parameterDescriptions": {
      "speech_engine_id": "The speech engine ID (accepts seng_ or agent_ prefix)",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_speech_engine": {
    "accessPath": [
      "updateSpeechEngine"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "speech_engine",
      "asr",
      "tts",
      "turn",
      "conversation",
      "privacy",
      "call_limits",
      "language",
      "tags",
      "overrides"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/speech-engine/{speech_engine_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "speech_engine_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Speech Engine",
    "parameterDescriptions": {
      "speech_engine_id": "The speech engine ID (accepts seng_ or agent_ prefix)",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_speech_engine": {
    "accessPath": [
      "deleteSpeechEngine"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/speech-engine/{speech_engine_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "speech_engine_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Speech Engine",
    "parameterDescriptions": {
      "speech_engine_id": "The speech engine ID (accepts seng_ or agent_ prefix)",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "run_conversation_analysis": {
    "accessPath": [
      "runConversationAnalysis"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/conversations/{conversation_id}/analysis/run",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "conversation_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Run Conversation Analysis",
    "parameterDescriptions": {
      "conversation_id": "ID of the conversation",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_environment_variable": {
    "accessPath": [
      "createEnvironmentVariable"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/convai/environment-variables",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Environment Variable",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "list_environment_variables": {
    "accessPath": [
      "listEnvironmentVariables"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/environment-variables",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "cursor",
      "page_size",
      "label",
      "environment",
      "type"
    ],
    "description": "List Environment Variables",
    "parameterDescriptions": {
      "cursor": "Pagination cursor from previous response",
      "page_size": "Number of items to return (1-100)",
      "label": "Filter by exact label match",
      "environment": "Filter to only return variables that have this environment. When specified, the values dict in the response will only contain this environment.",
      "type": "Filter by variable type",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_environment_variable": {
    "accessPath": [
      "getEnvironmentVariable"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/convai/environment-variables/{env_var_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "env_var_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Environment Variable",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "update_environment_variable": {
    "accessPath": [
      "updateEnvironmentVariable"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "values"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/convai/environment-variables/{env_var_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "env_var_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Environment Variable",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "compose_plan": {
    "accessPath": [
      "composePlan"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "prompt",
      "music_length_ms",
      "source_composition_plan",
      "model_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/music/plan",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Generate Composition Plan",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "generate": {
    "accessPath": [
      "generate"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "prompt",
      "generation_mode",
      "music_prompt",
      "lyrics_text",
      "composition_plan",
      "music_length_ms",
      "model_id",
      "seed",
      "force_instrumental",
      "finetune_id",
      "finetune_strength",
      "use_phonetic_names",
      "respect_sections_durations",
      "store_for_inpainting",
      "sign_with_c2pa"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/music",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "output_format"
    ],
    "description": "Compose Music",
    "parameterDescriptions": {
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "compose_detailed": {
    "accessPath": [
      "composeDetailed"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "prompt",
      "generation_mode",
      "music_prompt",
      "lyrics_text",
      "composition_plan",
      "music_length_ms",
      "model_id",
      "seed",
      "force_instrumental",
      "finetune_id",
      "finetune_strength",
      "use_phonetic_names",
      "respect_sections_durations",
      "store_for_inpainting",
      "with_timestamps",
      "sign_with_c2pa",
      "model_style_prefix"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/music/detailed",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "output_format"
    ],
    "description": "Compose Music With A Detailed Response",
    "parameterDescriptions": {
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "stream_compose": {
    "accessPath": [
      "streamCompose"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "prompt",
      "generation_mode",
      "music_prompt",
      "lyrics_text",
      "composition_plan",
      "music_length_ms",
      "model_id",
      "seed",
      "force_instrumental",
      "finetune_id",
      "finetune_strength",
      "use_phonetic_names",
      "store_for_inpainting"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/music/stream",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "output_format"
    ],
    "description": "Stream Composed Music",
    "parameterDescriptions": {
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "upload_song": {
    "accessPath": [
      "uploadSong"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file",
      "extract_composition_plan"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/music/upload",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Upload Music",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "separate_song_stems": {
    "accessPath": [
      "separateSongStems"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file",
      "stem_variation_id",
      "sign_with_c2pa"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/music/stem-separation",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "output_format"
    ],
    "description": "Stem Separation",
    "parameterDescriptions": {
      "output_format": "Output format of the generated audio. Formatted as codec_sample_rate_bitrate. So an mp3 with 22.05kHz sample rate at 32kbs is represented as mp3_22050_32. MP3 with 192kbps bitrate requires you to be subscribed to Creator tier or above. PCM with 44.1kHz sample rate requires you to be subscribed to Pro tier or above. Note that the μ-law format (sometimes written mu-law, often approximated as u-law) is commonly used for Twilio audio inputs.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "public_create_order": {
    "accessPath": [
      "publicCreateOrder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/productions/orders",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Order",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "public_list_orders": {
    "accessPath": [
      "publicListOrders"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/productions/orders",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "page_size",
      "offset",
      "status",
      "start_date",
      "end_date"
    ],
    "description": "List Orders",
    "parameterDescriptions": {
      "page_size": "Maximum number of orders to return per page.",
      "offset": "Number of orders to skip for pagination.",
      "status": "Filter orders by one or more statuses.",
      "start_date": "Filter orders created on or after this date.",
      "end_date": "Filter orders created on or before this date.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "public_get_order": {
    "accessPath": [
      "publicGetOrder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/productions/orders/{order_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "order_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Order",
    "parameterDescriptions": {
      "order_id": "The ID of the order.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "public_update_order": {
    "accessPath": [
      "publicUpdateOrder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "request"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "PATCH",
    "routeTemplate": "/v1/productions/orders/{order_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "order_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Order",
    "parameterDescriptions": {
      "order_id": "The ID of the order.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "public_register_media": {
    "accessPath": [
      "publicRegisterMedia"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "declared_language",
      "media",
      "media_url",
      "media_url_filename",
      "media_url_content_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/productions/orders/{order_id}/media",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "order_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Register Media",
    "parameterDescriptions": {
      "order_id": "The ID of the order to which this media will be attached.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "public_get_media_info": {
    "accessPath": [
      "publicGetMediaInfo"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/productions/orders/{order_id}/media/{media_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "order_id",
      "media_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Media Info",
    "parameterDescriptions": {
      "order_id": "The ID of the order.",
      "media_id": "The ID of the media file.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "public_upsert_order_item": {
    "accessPath": [
      "publicUpsertOrderItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "request"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/productions/orders/{order_id}/items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "order_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Upsert Order Item",
    "parameterDescriptions": {
      "order_id": "The ID of the order.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "public_remove_order_item": {
    "accessPath": [
      "publicRemoveOrderItem"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/productions/orders/{order_id}/items/{item_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "order_id",
      "item_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Remove Order Item",
    "parameterDescriptions": {
      "order_id": "The ID of the order.",
      "item_id": "The ID of the order item.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "public_submit_order": {
    "accessPath": [
      "publicSubmitOrder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/productions/orders/{order_id}/submit",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "order_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Submit Order",
    "parameterDescriptions": {
      "order_id": "The ID of the order.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "public_get_order_deliverables": {
    "accessPath": [
      "publicGetOrderDeliverables"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/productions/orders/{order_id}/deliverables",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "order_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Order Deliverables",
    "parameterDescriptions": {
      "order_id": "The ID of the order.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "public_get_available_languages": {
    "accessPath": [
      "publicGetAvailableLanguages"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/productions/orders/languages/{order_item_kind}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "order_item_kind"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Available Languages",
    "parameterDescriptions": {
      "order_item_kind": "The kind of order item.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "create_pvc_voice": {
    "accessPath": [
      "createPvcVoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "language",
      "description",
      "labels"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/voices/pvc",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create Pvc Voice",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "edit_pvc_voice": {
    "accessPath": [
      "editPvcVoice"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "language",
      "description",
      "labels"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/voices/pvc/{voice_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Edit Pvc Voice",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "add_pvc_voice_samples": {
    "accessPath": [
      "addPvcVoiceSamples"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "files",
      "remove_background_noise"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/voices/pvc/{voice_id}/samples",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add Samples To Pvc Voice",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "edit_pvc_voice_sample": {
    "accessPath": [
      "editPvcVoiceSample"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "remove_background_noise",
      "selected_speaker_ids",
      "trim_start_time",
      "trim_end_time",
      "file_name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/voices/pvc/{voice_id}/samples/{sample_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id",
      "sample_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update Pvc Voice Sample",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "sample_id": "Sample ID to be used",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "delete_pvc_voice_sample": {
    "accessPath": [
      "deletePvcVoiceSample"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "DELETE",
    "routeTemplate": "/v1/voices/pvc/{voice_id}/samples/{sample_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id",
      "sample_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete Pvc Voice Sample",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "sample_id": "Sample ID to be used",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_pvc_sample_audio": {
    "accessPath": [
      "getPvcSampleAudio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/voices/pvc/{voice_id}/samples/{sample_id}/audio",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id",
      "sample_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "remove_background_noise"
    ],
    "description": "Retrieve Voice Sample Audio",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "sample_id": "Sample ID to be used",
      "remove_background_noise": "If set will remove background noise for voice samples using our audio isolation model. If the samples do not include background noise, it can make the quality worse.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_pvc_sample_visual_waveform": {
    "accessPath": [
      "getPvcSampleVisualWaveform"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/voices/pvc/{voice_id}/samples/{sample_id}/waveform",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id",
      "sample_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Voice Sample Visual Waveform",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "sample_id": "Sample ID to be used",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_pvc_sample_speakers": {
    "accessPath": [
      "getPvcSampleSpeakers"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/voices/pvc/{voice_id}/samples/{sample_id}/speakers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id",
      "sample_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Speaker Separation Status",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "sample_id": "Sample ID to be used",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "start_speaker_separation": {
    "accessPath": [
      "startSpeakerSeparation"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/voices/pvc/{voice_id}/samples/{sample_id}/separate-speakers",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id",
      "sample_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Start Speaker Separation",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "sample_id": "Sample ID to be used",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_speaker_audio": {
    "accessPath": [
      "getSpeakerAudio"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/voices/pvc/{voice_id}/samples/{sample_id}/speakers/{speaker_id}/audio",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id",
      "sample_id",
      "speaker_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Retrieve Separated Speaker Audio",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "sample_id": "Sample ID to be used",
      "speaker_id": "Speaker ID to be used, you can use GET https://api.elevenlabs.io/v1/voices/{voice_id}/samples/{sample_id}/speakers to list all the available speakers for a sample.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "get_pvc_voice_captcha": {
    "accessPath": [
      "getPvcVoiceCaptcha"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "GET",
    "routeTemplate": "/v1/voices/pvc/{voice_id}/captcha",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Pvc Voice Captcha",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "verify_pvc_voice_captcha": {
    "accessPath": [
      "verifyPvcVoiceCaptcha"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "recording"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/voices/pvc/{voice_id}/captcha",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Verify Pvc Voice Captcha",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "run_pvc_voice_training": {
    "accessPath": [
      "runPvcVoiceTraining"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "model_id"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/voices/pvc/{voice_id}/train",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Run Pvc Training",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "request_pvc_manual_verification": {
    "accessPath": [
      "requestPvcManualVerification"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "files",
      "extra_text"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/voices/pvc/{voice_id}/verification",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "voice_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Request Manual Verification",
    "parameterDescriptions": {
      "voice_id": "Voice ID to be used, you can use https://api.elevenlabs.io/v1/voices to list all the available voices.",
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "usage_by_product_over_time": {
    "accessPath": [
      "usageByProductOverTime"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "start_time",
      "end_time",
      "interval_seconds",
      "group_by",
      "filters"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/workspace/analytics/query/usage-by-product-over-time",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get Workspace Usage",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "requests_list": {
    "accessPath": [
      "requestsList"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "start_time",
      "end_time",
      "limit",
      "sort",
      "filters",
      "search"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [
      "xi-api-key"
    ],
    "method": "POST",
    "routeTemplate": "/v1/workspace/analytics/requests",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "List Api Requests",
    "parameterDescriptions": {
      "xi-api-key": "Your API key. This is required by most endpoints to access our API programmatically. You can view your xi-api-key using the 'Profile' tab on the website."
    }
  },
  "redirect_to_mintlify": {
    "accessPath": [
      "redirectToMintlify"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/docs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Redirect To Mintlify"
  }
} satisfies ToolRuntimeMetadataMap;
