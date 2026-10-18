export const INITIAL_TASKS = [];

export const TASK_SCHEMA = Object.freeze({
  id: '',
  remoteId: null,
  title: '',
  completed: false,
  isLocalSession: false,
});

export const TASK_FILTERS = Object.freeze({
  ALL: 'all',
  PENDING: 'pending',
  COMPLETED: 'completed',
});

export const APP_VIEWS = Object.freeze({
  SUMMARY: 'resumen',
  TASKS: 'tareas',
  NEW: 'nueva',
});

export const generateLocalId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `local-${crypto.randomUUID()}`;
  }
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

export const createTaskEntity = (rawTask = {}, { isFromPost = false } = {}) => {
  const cleanTitle = String(rawTask.title ?? '').trim();
  const remoteId = rawTask.id ?? rawTask.remoteId ?? null;

  const stableLocalId = isFromPost || !remoteId
    ? generateLocalId()
    : String(rawTask.localId ?? `remote-${remoteId}`);

  return {
    id: stableLocalId,
    remoteId: remoteId,
    title: cleanTitle,
    completed: Boolean(rawTask.completed),
    isLocalSession: Boolean(isFromPost || rawTask.isLocalSession),
  };
};