import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "listAssistants": {
    "accessPath": [
      "listAssistants"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/assistants",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "order",
      "after",
      "before"
    ]
  },
  "createAssistant": {
    "accessPath": [
      "createAssistant"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "model",
      "name",
      "description",
      "instructions",
      "reasoning_effort",
      "tools",
      "tool_resources",
      "metadata",
      "temperature",
      "top_p",
      "response_format"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/assistants",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getAssistant": {
    "accessPath": [
      "getAssistant"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/assistants/{assistant_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "assistant_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "modifyAssistant": {
    "accessPath": [
      "modifyAssistant"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "model",
      "reasoning_effort",
      "name",
      "description",
      "instructions",
      "tools",
      "tool_resources",
      "metadata",
      "temperature",
      "top_p",
      "response_format"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/assistants/{assistant_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "assistant_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteAssistant": {
    "accessPath": [
      "deleteAssistant"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/assistants/{assistant_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "assistant_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "createSpeech": {
    "accessPath": [
      "createSpeech"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "model",
      "input",
      "instructions",
      "voice",
      "response_format",
      "speed"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/audio/speech",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "createTranscription": {
    "accessPath": [
      "createTranscription"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file",
      "model",
      "language",
      "prompt",
      "response_format",
      "temperature",
      "include[]",
      "timestamp_granularities[]",
      "stream"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/audio/transcriptions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "createTranslation": {
    "accessPath": [
      "createTranslation"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file",
      "model",
      "prompt",
      "response_format",
      "temperature"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/audio/translations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "createBatch": {
    "accessPath": [
      "createBatch"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "input_file_id",
      "endpoint",
      "completion_window",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/batches",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listBatches": {
    "accessPath": [
      "listBatches"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/batches",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "after",
      "limit"
    ]
  },
  "retrieveBatch": {
    "accessPath": [
      "retrieveBatch"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/batches/{batch_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "batch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "cancelBatch": {
    "accessPath": [
      "cancelBatch"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/batches/{batch_id}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "batch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listChatCompletions": {
    "accessPath": [
      "listChatCompletions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/chat/completions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "model",
      "metadata",
      "after",
      "limit",
      "order"
    ]
  },
  "createChatCompletion": {
    "accessPath": [
      "createChatCompletion"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "metadata",
      "temperature",
      "top_p",
      "user",
      "service_tier",
      "messages",
      "model",
      "modalities",
      "reasoning_effort",
      "max_completion_tokens",
      "frequency_penalty",
      "presence_penalty",
      "web_search_options",
      "top_logprobs",
      "response_format",
      "audio",
      "store",
      "stream",
      "stop",
      "logit_bias",
      "logprobs",
      "max_tokens",
      "n",
      "prediction",
      "seed",
      "stream_options",
      "tools",
      "tool_choice",
      "parallel_tool_calls",
      "function_call",
      "functions"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/chat/completions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getChatCompletion": {
    "accessPath": [
      "getChatCompletion"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/chat/completions/{completion_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "completion_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "updateChatCompletion": {
    "accessPath": [
      "updateChatCompletion"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/chat/completions/{completion_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "completion_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteChatCompletion": {
    "accessPath": [
      "deleteChatCompletion"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/chat/completions/{completion_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "completion_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getChatCompletionMessages": {
    "accessPath": [
      "getChatCompletionMessages"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/chat/completions/{completion_id}/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "completion_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "after",
      "limit",
      "order"
    ]
  },
  "createCompletion": {
    "accessPath": [
      "createCompletion"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "model",
      "prompt",
      "best_of",
      "echo",
      "frequency_penalty",
      "logit_bias",
      "logprobs",
      "max_tokens",
      "n",
      "presence_penalty",
      "seed",
      "stop",
      "stream",
      "stream_options",
      "suffix",
      "temperature",
      "top_p",
      "user"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/completions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "createEmbedding": {
    "accessPath": [
      "createEmbedding"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "input",
      "model",
      "encoding_format",
      "dimensions",
      "user"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/embeddings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listEvals": {
    "accessPath": [
      "listEvals"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/evals",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "after",
      "limit",
      "order",
      "order_by"
    ]
  },
  "createEval": {
    "accessPath": [
      "createEval"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "metadata",
      "data_source_config",
      "testing_criteria"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/evals",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getEval": {
    "accessPath": [
      "getEval"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/evals/{eval_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "eval_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "updateEval": {
    "accessPath": [
      "updateEval"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/evals/{eval_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "eval_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteEval": {
    "accessPath": [
      "deleteEval"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/evals/{eval_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "eval_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getEvalRuns": {
    "accessPath": [
      "getEvalRuns"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/evals/{eval_id}/runs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "eval_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "after",
      "limit",
      "order",
      "status"
    ]
  },
  "createEvalRun": {
    "accessPath": [
      "createEvalRun"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "metadata",
      "data_source"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/evals/{eval_id}/runs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "eval_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getEvalRun": {
    "accessPath": [
      "getEvalRun"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/evals/{eval_id}/runs/{run_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "eval_id",
      "run_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "cancelEvalRun": {
    "accessPath": [
      "cancelEvalRun"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/evals/{eval_id}/runs/{run_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "eval_id",
      "run_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteEvalRun": {
    "accessPath": [
      "deleteEvalRun"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/evals/{eval_id}/runs/{run_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "eval_id",
      "run_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getEvalRunOutputItems": {
    "accessPath": [
      "getEvalRunOutputItems"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/evals/{eval_id}/runs/{run_id}/output_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "eval_id",
      "run_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "after",
      "limit",
      "status",
      "order"
    ]
  },
  "getEvalRunOutputItem": {
    "accessPath": [
      "getEvalRunOutputItem"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "eval_id",
      "run_id",
      "output_item_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listFiles": {
    "accessPath": [
      "listFiles"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "purpose",
      "limit",
      "order",
      "after"
    ]
  },
  "createFile": {
    "accessPath": [
      "createFile"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file",
      "purpose"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteFile": {
    "accessPath": [
      "deleteFile"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/files/{file_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "retrieveFile": {
    "accessPath": [
      "retrieveFile"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "downloadFile": {
    "accessPath": [
      "downloadFile"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/files/{file_id}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "file_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listFineTuningCheckpointPermissions": {
    "accessPath": [
      "listFineTuningCheckpointPermissions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fine_tuned_model_checkpoint"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "project_id",
      "after",
      "limit",
      "order"
    ]
  },
  "createFineTuningCheckpointPermission": {
    "accessPath": [
      "createFineTuningCheckpointPermission"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "project_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fine_tuned_model_checkpoint"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteFineTuningCheckpointPermission": {
    "accessPath": [
      "deleteFineTuningCheckpointPermission"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fine_tuned_model_checkpoint",
      "permission_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "createFineTuningJob": {
    "accessPath": [
      "createFineTuningJob"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "model",
      "training_file",
      "hyperparameters",
      "suffix",
      "validation_file",
      "integrations",
      "seed",
      "method",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/fine_tuning/jobs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listPaginatedFineTuningJobs": {
    "accessPath": [
      "listPaginatedFineTuningJobs"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/fine_tuning/jobs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "after",
      "limit",
      "metadata"
    ]
  },
  "retrieveFineTuningJob": {
    "accessPath": [
      "retrieveFineTuningJob"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/fine_tuning/jobs/{fine_tuning_job_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fine_tuning_job_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "cancelFineTuningJob": {
    "accessPath": [
      "cancelFineTuningJob"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/fine_tuning/jobs/{fine_tuning_job_id}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fine_tuning_job_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listFineTuningJobCheckpoints": {
    "accessPath": [
      "listFineTuningJobCheckpoints"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/fine_tuning/jobs/{fine_tuning_job_id}/checkpoints",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fine_tuning_job_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "after",
      "limit"
    ]
  },
  "listFineTuningEvents": {
    "accessPath": [
      "listFineTuningEvents"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/fine_tuning/jobs/{fine_tuning_job_id}/events",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "fine_tuning_job_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "after",
      "limit"
    ]
  },
  "createImageEdit": {
    "accessPath": [
      "createImageEdit"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "image",
      "prompt",
      "mask",
      "model",
      "n",
      "size",
      "response_format",
      "user",
      "quality"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/images/edits",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "createImage": {
    "accessPath": [
      "createImage"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "prompt",
      "model",
      "n",
      "quality",
      "response_format",
      "output_format",
      "output_compression",
      "size",
      "moderation",
      "background",
      "style",
      "user"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/images/generations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "createImageVariation": {
    "accessPath": [
      "createImageVariation"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "image",
      "model",
      "n",
      "response_format",
      "size",
      "user"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/images/variations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listModels": {
    "accessPath": [
      "listModels"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/models",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "retrieveModel": {
    "accessPath": [
      "retrieveModel"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/models/{model}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "model"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteModel": {
    "accessPath": [
      "deleteModel"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/models/{model}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "model"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "createModeration": {
    "accessPath": [
      "createModeration"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "input",
      "model"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/moderations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "admin-api-keys-list": {
    "accessPath": [
      "adminApiKeysList"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/admin_api_keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "after",
      "order",
      "limit"
    ]
  },
  "admin-api-keys-create": {
    "accessPath": [
      "adminApiKeysCreate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/admin_api_keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "admin-api-keys-get": {
    "accessPath": [
      "adminApiKeysGet"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/admin_api_keys/{key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "admin-api-keys-delete": {
    "accessPath": [
      "adminApiKeysDelete"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/organization/admin_api_keys/{key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list-audit-logs": {
    "accessPath": [
      "listAuditLogs"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/audit_logs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "effective_at",
      "project_ids[]",
      "event_types[]",
      "actor_ids[]",
      "actor_emails[]",
      "resource_ids[]",
      "limit",
      "after",
      "before"
    ]
  },
  "listOrganizationCertificates": {
    "accessPath": [
      "listOrganizationCertificates"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/certificates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "after",
      "order"
    ]
  },
  "uploadCertificate": {
    "accessPath": [
      "uploadCertificate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "content"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/certificates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "activateOrganizationCertificates": {
    "accessPath": [
      "activateOrganizationCertificates"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "certificate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/certificates/activate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deactivateOrganizationCertificates": {
    "accessPath": [
      "deactivateOrganizationCertificates"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "certificate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/certificates/deactivate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getCertificate": {
    "accessPath": [
      "getCertificate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/certificates/{certificate_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "cert_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "modifyCertificate": {
    "accessPath": [
      "modifyCertificate"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/certificates/{certificate_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteCertificate": {
    "accessPath": [
      "deleteCertificate"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/organization/certificates/{certificate_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "usage-costs": {
    "accessPath": [
      "usageCosts"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/costs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_time",
      "end_time",
      "bucket_width",
      "project_ids",
      "group_by",
      "limit",
      "page"
    ]
  },
  "list-invites": {
    "accessPath": [
      "listInvites"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/invites",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "after"
    ]
  },
  "inviteUser": {
    "accessPath": [
      "inviteUser"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "email",
      "role",
      "projects"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/invites",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "retrieve-invite": {
    "accessPath": [
      "retrieveInvite"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/invites/{invite_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invite_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete-invite": {
    "accessPath": [
      "deleteInvite"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/organization/invites/{invite_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "invite_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list-projects": {
    "accessPath": [
      "listProjects"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "after",
      "include_archived"
    ]
  },
  "create-project": {
    "accessPath": [
      "createProject"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/projects",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "retrieve-project": {
    "accessPath": [
      "retrieveProject"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/projects/{project_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "modify-project": {
    "accessPath": [
      "modifyProject"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/projects/{project_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list-project-api-keys": {
    "accessPath": [
      "listProjectApiKeys"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/projects/{project_id}/api_keys",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "after"
    ]
  },
  "retrieve-project-api-key": {
    "accessPath": [
      "retrieveProjectApiKey"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/projects/{project_id}/api_keys/{key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete-project-api-key": {
    "accessPath": [
      "deleteProjectApiKey"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/organization/projects/{project_id}/api_keys/{key_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "key_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "archive-project": {
    "accessPath": [
      "archiveProject"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/projects/{project_id}/archive",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listProjectCertificates": {
    "accessPath": [
      "listProjectCertificates"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/projects/{project_id}/certificates",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "after",
      "order"
    ]
  },
  "activateProjectCertificates": {
    "accessPath": [
      "activateProjectCertificates"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "certificate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/projects/{project_id}/certificates/activate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deactivateProjectCertificates": {
    "accessPath": [
      "deactivateProjectCertificates"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "certificate_ids"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/projects/{project_id}/certificates/deactivate",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list-project-rate-limits": {
    "accessPath": [
      "listProjectRateLimits"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/projects/{project_id}/rate_limits",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "after",
      "before"
    ]
  },
  "update-project-rate-limits": {
    "accessPath": [
      "updateProjectRateLimits"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "max_requests_per_1_minute",
      "max_tokens_per_1_minute",
      "max_images_per_1_minute",
      "max_audio_megabytes_per_1_minute",
      "max_requests_per_1_day",
      "batch_1_day_max_input_tokens"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/projects/{project_id}/rate_limits/{rate_limit_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "rate_limit_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list-project-service-accounts": {
    "accessPath": [
      "listProjectServiceAccounts"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/projects/{project_id}/service_accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "after"
    ]
  },
  "create-project-service-account": {
    "accessPath": [
      "createProjectServiceAccount"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/projects/{project_id}/service_accounts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "retrieve-project-service-account": {
    "accessPath": [
      "retrieveProjectServiceAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/projects/{project_id}/service_accounts/{service_account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "service_account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete-project-service-account": {
    "accessPath": [
      "deleteProjectServiceAccount"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/organization/projects/{project_id}/service_accounts/{service_account_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "service_account_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "list-project-users": {
    "accessPath": [
      "listProjectUsers"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/projects/{project_id}/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "after"
    ]
  },
  "create-project-user": {
    "accessPath": [
      "createProjectUser"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "user_id",
      "role"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/projects/{project_id}/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "retrieve-project-user": {
    "accessPath": [
      "retrieveProjectUser"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/projects/{project_id}/users/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "modify-project-user": {
    "accessPath": [
      "modifyProjectUser"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "role"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/projects/{project_id}/users/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete-project-user": {
    "accessPath": [
      "deleteProjectUser"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/organization/projects/{project_id}/users/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "project_id",
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "usage-audio-speeches": {
    "accessPath": [
      "usageAudioSpeeches"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/usage/audio_speeches",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_time",
      "end_time",
      "bucket_width",
      "project_ids",
      "user_ids",
      "api_key_ids",
      "models",
      "group_by",
      "limit",
      "page"
    ]
  },
  "usage-audio-transcriptions": {
    "accessPath": [
      "usageAudioTranscriptions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/usage/audio_transcriptions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_time",
      "end_time",
      "bucket_width",
      "project_ids",
      "user_ids",
      "api_key_ids",
      "models",
      "group_by",
      "limit",
      "page"
    ]
  },
  "usage-code-interpreter-sessions": {
    "accessPath": [
      "usageCodeInterpreterSessions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/usage/code_interpreter_sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_time",
      "end_time",
      "bucket_width",
      "project_ids",
      "group_by",
      "limit",
      "page"
    ]
  },
  "usage-completions": {
    "accessPath": [
      "usageCompletions"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/usage/completions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_time",
      "end_time",
      "bucket_width",
      "project_ids",
      "user_ids",
      "api_key_ids",
      "models",
      "batch",
      "group_by",
      "limit",
      "page"
    ]
  },
  "usage-embeddings": {
    "accessPath": [
      "usageEmbeddings"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/usage/embeddings",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_time",
      "end_time",
      "bucket_width",
      "project_ids",
      "user_ids",
      "api_key_ids",
      "models",
      "group_by",
      "limit",
      "page"
    ]
  },
  "usage-images": {
    "accessPath": [
      "usageImages"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/usage/images",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_time",
      "end_time",
      "bucket_width",
      "sources",
      "sizes",
      "project_ids",
      "user_ids",
      "api_key_ids",
      "models",
      "group_by",
      "limit",
      "page"
    ]
  },
  "usage-moderations": {
    "accessPath": [
      "usageModerations"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/usage/moderations",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_time",
      "end_time",
      "bucket_width",
      "project_ids",
      "user_ids",
      "api_key_ids",
      "models",
      "group_by",
      "limit",
      "page"
    ]
  },
  "usage-vector-stores": {
    "accessPath": [
      "usageVectorStores"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/usage/vector_stores",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "start_time",
      "end_time",
      "bucket_width",
      "project_ids",
      "group_by",
      "limit",
      "page"
    ]
  },
  "list-users": {
    "accessPath": [
      "listUsers"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/users",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "after",
      "emails"
    ]
  },
  "retrieve-user": {
    "accessPath": [
      "retrieveUser"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/organization/users/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "modify-user": {
    "accessPath": [
      "modifyUser"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "role"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/organization/users/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "delete-user": {
    "accessPath": [
      "deleteUser"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/organization/users/{user_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "user_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create-realtime-session": {
    "accessPath": [
      "createRealtimeSession"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "modalities",
      "model",
      "instructions",
      "voice",
      "input_audio_format",
      "output_audio_format",
      "input_audio_transcription",
      "turn_detection",
      "input_audio_noise_reduction",
      "tools",
      "tool_choice",
      "temperature",
      "max_response_output_tokens"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/realtime/sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "create-realtime-transcription-session": {
    "accessPath": [
      "createRealtimeTranscriptionSession"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "modalities",
      "input_audio_format",
      "input_audio_transcription",
      "turn_detection",
      "input_audio_noise_reduction",
      "include"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/realtime/transcription_sessions",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "createResponse": {
    "accessPath": [
      "createResponse"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "metadata",
      "temperature",
      "top_p",
      "user",
      "service_tier",
      "previous_response_id",
      "model",
      "reasoning",
      "max_output_tokens",
      "instructions",
      "text",
      "tools",
      "tool_choice",
      "truncation",
      "input",
      "include",
      "parallel_tool_calls",
      "store",
      "stream"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/responses",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getResponse": {
    "accessPath": [
      "getResponse"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/responses/{response_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "response_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include"
    ]
  },
  "deleteResponse": {
    "accessPath": [
      "deleteResponse"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/responses/{response_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "response_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listInputItems": {
    "accessPath": [
      "listInputItems"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/responses/{response_id}/input_items",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "response_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "order",
      "after",
      "before",
      "include"
    ]
  },
  "createThread": {
    "accessPath": [
      "createThread"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "messages",
      "tool_resources",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/threads",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "createThreadAndRun": {
    "accessPath": [
      "createThreadAndRun"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "assistant_id",
      "thread",
      "model",
      "instructions",
      "tools",
      "tool_resources",
      "metadata",
      "temperature",
      "top_p",
      "stream",
      "max_prompt_tokens",
      "max_completion_tokens",
      "truncation_strategy",
      "tool_choice",
      "parallel_tool_calls",
      "response_format"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/threads/runs",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getThread": {
    "accessPath": [
      "getThread"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/threads/{thread_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "modifyThread": {
    "accessPath": [
      "modifyThread"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "tool_resources",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/threads/{thread_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteThread": {
    "accessPath": [
      "deleteThread"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/threads/{thread_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listMessages": {
    "accessPath": [
      "listMessages"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/threads/{thread_id}/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "order",
      "after",
      "before",
      "run_id"
    ]
  },
  "createMessage": {
    "accessPath": [
      "createMessage"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "role",
      "content",
      "attachments",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/threads/{thread_id}/messages",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getMessage": {
    "accessPath": [
      "getMessage"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/threads/{thread_id}/messages/{message_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "modifyMessage": {
    "accessPath": [
      "modifyMessage"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/threads/{thread_id}/messages/{message_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteMessage": {
    "accessPath": [
      "deleteMessage"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/threads/{thread_id}/messages/{message_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id",
      "message_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listRuns": {
    "accessPath": [
      "listRuns"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/threads/{thread_id}/runs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "order",
      "after",
      "before"
    ]
  },
  "createRun": {
    "accessPath": [
      "createRun"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "assistant_id",
      "model",
      "reasoning_effort",
      "instructions",
      "additional_instructions",
      "additional_messages",
      "tools",
      "metadata",
      "temperature",
      "top_p",
      "stream",
      "max_prompt_tokens",
      "max_completion_tokens",
      "truncation_strategy",
      "tool_choice",
      "parallel_tool_calls",
      "response_format"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/threads/{thread_id}/runs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include[]"
    ]
  },
  "getRun": {
    "accessPath": [
      "getRun"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/threads/{thread_id}/runs/{run_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id",
      "run_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "modifyRun": {
    "accessPath": [
      "modifyRun"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/threads/{thread_id}/runs/{run_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id",
      "run_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "cancelRun": {
    "accessPath": [
      "cancelRun"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/threads/{thread_id}/runs/{run_id}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id",
      "run_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listRunSteps": {
    "accessPath": [
      "listRunSteps"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/threads/{thread_id}/runs/{run_id}/steps",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id",
      "run_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "order",
      "after",
      "before",
      "include[]"
    ]
  },
  "getRunStep": {
    "accessPath": [
      "getRunStep"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/threads/{thread_id}/runs/{run_id}/steps/{step_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id",
      "run_id",
      "step_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "include[]"
    ]
  },
  "submitToolOuputsToRun": {
    "accessPath": [
      "submitToolOuputsToRun"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "tool_outputs",
      "stream"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/threads/{thread_id}/runs/{run_id}/submit_tool_outputs",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "thread_id",
      "run_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "createUpload": {
    "accessPath": [
      "createUpload"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "filename",
      "purpose",
      "bytes",
      "mime_type"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/uploads",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "cancelUpload": {
    "accessPath": [
      "cancelUpload"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/uploads/{upload_id}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "upload_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "completeUpload": {
    "accessPath": [
      "completeUpload"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "part_ids",
      "md5"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/uploads/{upload_id}/complete",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "upload_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "addUploadPart": {
    "accessPath": [
      "addUploadPart"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "data"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/uploads/{upload_id}/parts",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "upload_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listVectorStores": {
    "accessPath": [
      "listVectorStores"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/vector_stores",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "order",
      "after",
      "before"
    ]
  },
  "createVectorStore": {
    "accessPath": [
      "createVectorStore"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file_ids",
      "name",
      "expires_after",
      "chunking_strategy",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/vector_stores",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getVectorStore": {
    "accessPath": [
      "getVectorStore"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/vector_stores/{vector_store_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "vector_store_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "modifyVectorStore": {
    "accessPath": [
      "modifyVectorStore"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "name",
      "expires_after",
      "metadata"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/vector_stores/{vector_store_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "vector_store_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteVectorStore": {
    "accessPath": [
      "deleteVectorStore"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/vector_stores/{vector_store_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "vector_store_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "createVectorStoreFileBatch": {
    "accessPath": [
      "createVectorStoreFileBatch"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file_ids",
      "chunking_strategy",
      "attributes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/vector_stores/{vector_store_id}/file_batches",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "vector_store_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getVectorStoreFileBatch": {
    "accessPath": [
      "getVectorStoreFileBatch"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/vector_stores/{vector_store_id}/file_batches/{batch_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "vector_store_id",
      "batch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "cancelVectorStoreFileBatch": {
    "accessPath": [
      "cancelVectorStoreFileBatch"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/vector_stores/{vector_store_id}/file_batches/{batch_id}/cancel",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "vector_store_id",
      "batch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "listFilesInVectorStoreBatch": {
    "accessPath": [
      "listFilesInVectorStoreBatch"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/vector_stores/{vector_store_id}/file_batches/{batch_id}/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "vector_store_id",
      "batch_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "order",
      "after",
      "before",
      "filter"
    ]
  },
  "listVectorStoreFiles": {
    "accessPath": [
      "listVectorStoreFiles"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/vector_stores/{vector_store_id}/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "vector_store_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "limit",
      "order",
      "after",
      "before",
      "filter"
    ]
  },
  "createVectorStoreFile": {
    "accessPath": [
      "createVectorStoreFile"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "file_id",
      "chunking_strategy",
      "attributes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/vector_stores/{vector_store_id}/files",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "vector_store_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "getVectorStoreFile": {
    "accessPath": [
      "getVectorStoreFile"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/vector_stores/{vector_store_id}/files/{file_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "vector_store_id",
      "file_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "deleteVectorStoreFile": {
    "accessPath": [
      "deleteVectorStoreFile"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/v1/vector_stores/{vector_store_id}/files/{file_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "vector_store_id",
      "file_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "updateVectorStoreFileAttributes": {
    "accessPath": [
      "updateVectorStoreFileAttributes"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "attributes"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/vector_stores/{vector_store_id}/files/{file_id}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "vector_store_id",
      "file_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "retrieveVectorStoreFileContent": {
    "accessPath": [
      "retrieveVectorStoreFileContent"
    ],
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/v1/vector_stores/{vector_store_id}/files/{file_id}/content",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "vector_store_id",
      "file_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  },
  "searchVectorStore": {
    "accessPath": [
      "searchVectorStore"
    ],
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "query",
      "rewrite_query",
      "max_num_results",
      "filters",
      "ranking_options"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/v1/vector_stores/{vector_store_id}/search",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "vector_store_id"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": []
  }
} satisfies ToolRuntimeMetadataMap;
