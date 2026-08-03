/**
 * Native Share API with copy-link fallback
 */
export async function shareContent(opts: {
  title?: string;
  text?: string;
  url?: string;
}): Promise<'native' | 'copied' | 'failed'> {
  if (typeof window === 'undefined') return 'failed';

  const shareData: ShareData = {
    title: opts.title ?? document.title,
    text: opts.text,
    url: opts.url ?? window.location.href,
  };

  if ('share' in navigator && navigator.canShare?.(shareData)) {
    try {
      await navigator.share(shareData);
      return 'native';
    } catch (e) {
      // User cancelled or share failed — fall through to copy
      if ((e as DOMException).name === 'AbortError') return 'failed';
    }
  }

  // Fallback: copy to clipboard
  try {
    await navigator.clipboard.writeText(shareData.url ?? window.location.href);
    return 'copied';
  } catch {
    return 'failed';
  }
}
