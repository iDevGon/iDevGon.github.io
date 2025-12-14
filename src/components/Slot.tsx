import {
  cloneElement,
  forwardRef,
  type HTMLAttributes,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';

type SlotProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
};

function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): Ref<T> {
  return (node: T) => {
    for (const ref of refs) {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T>).current = node;
      }
    }
  };
}

function mergeProps(
  slotProps: Record<string, unknown>,
  childProps: Record<string, unknown>,
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...slotProps };

  for (const propName in childProps) {
    const slotValue = slotProps[propName];
    const childValue = childProps[propName];

    // className 병합
    if (propName === 'className') {
      merged[propName] = [slotValue, childValue].filter(Boolean).join(' ');
    }
    // style 병합
    else if (propName === 'style') {
      merged[propName] = {
        ...(slotValue as object),
        ...(childValue as object),
      };
    }
    // 이벤트 핸들러 병합
    else if (
      propName.startsWith('on') &&
      typeof slotValue === 'function' &&
      typeof childValue === 'function'
    ) {
      merged[propName] = (...args: unknown[]) => {
        (childValue as (...args: unknown[]) => void)(...args);
        (slotValue as (...args: unknown[]) => void)(...args);
      };
    }
    // 나머지는 자식 props 우선
    else {
      merged[propName] = childValue !== undefined ? childValue : slotValue;
    }
  }

  return merged;
}

export const Slot = forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, forwardedRef) => {
    if (!isValidElement(children)) {
      console.warn(
        'Slot component expects a single valid React element as children',
      );
      return null;
    }

    const childElement = children as ReactElement<
      HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }
    >;

    const mergedProps = mergeProps(
      slotProps as Record<string, unknown>,
      childElement.props as unknown as Record<string, unknown>,
    );
    const mergedRef = mergeRefs(forwardedRef, childElement.props.ref);

    return cloneElement(childElement, {
      ...mergedProps,
      ref: mergedRef,
    });
  },
);

Slot.displayName = 'Slot';
