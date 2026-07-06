import "@testing-library/jest-dom";

// JSDOM has no IntersectionObserver; Motion's whileInView needs it.
// This mock immediately reports the element as intersecting so reveal
// animations settle to their visible state in tests.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  constructor(private cb: IntersectionObserverCallback) {}
  observe = (target: Element) => {
    this.cb(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this,
    );
  };
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = () => [];
}

globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;
