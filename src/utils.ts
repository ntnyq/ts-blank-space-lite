export type InteropModuleDefault<T> = T extends { default: infer U } ? U : T
export type Awaitable<T> = T | PromiseLike<T>

/**
 * resolve module with interop default
 */
export async function interopDefault<T>(
  mod: Awaitable<T>,
): Promise<Awaited<InteropModuleDefault<T>>> {
  const resolved = await mod
  return (mod as any).default || resolved
}
