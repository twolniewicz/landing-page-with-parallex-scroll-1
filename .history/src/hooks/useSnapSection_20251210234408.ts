export function useHorizontalSnap(ref: RefObject<HTMLElement>, x: MotionValue<number>) {
  useEffect(() => {
    let timeout: any;

    const onScroll = () => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        const el = ref.current;
        if (!el) return;

        const position = x.get();  // ✔ lấy số thực từ MotionValue

        window.scrollTo({
          top: position,           // ✔ OK
          behavior: "smooth",
        });
      }, 80);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", onScroll);
    };
  }, [ref, x]);
}
