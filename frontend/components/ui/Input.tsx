"use client";
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "../../lib/utils";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full rounded-(--radius-md) px-4 py-3 text-sm outline-none border transition-colors",
      "bg-surface border-border text-text placeholder:text-muted",
      "focus:border-primary focus:ring-2 focus:ring-(--primary)/20",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, className, id, icon, error, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      !!props.value || !!props.defaultValue,
    );
    const active = focused || hasValue;
    const inputId = id || label.replace(/\s+/g, "-").toLowerCase();

    return (
      <div className="relative">
        {icon && (
          <span
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: focused ? "var(--primary)" : "var(--muted)" }}
          >
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          className={cn(
            "peer w-full rounded-(--radius-md) pt-6 pb-2 text-sm outline-none border transition-colors",
            icon ? "pl-11 pr-4" : "px-4",
            "bg-surface border-border text-text",
            "focus:border-primary focus:ring-2 focus:ring-(--primary)/20",
            error && "border-danger focus:border-danger focus:ring-(--danger)/20",
            className,
          )}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(!!e.target.value);
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            props.onChange?.(e);
          }}
          {...props}
        />
        <label
          htmlFor={inputId}
          className="absolute pointer-events-none transition-all duration-200"
          style={{
            left: icon ? "44px" : "16px",
            top: active ? "8px" : "50%",
            transform: active
              ? "translateY(0) scale(0.75)"
              : "translateY(-50%) scale(1)",
            transformOrigin: "left top",
            color: focused ? "var(--primary)" : "var(--muted)",
          }}
        >
          {label}
        </label>
      </div>
    );
  },
);
FloatingInput.displayName = "FloatingInput";

interface FloatingTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, className, id, error, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      !!props.value || !!props.defaultValue,
    );
    const active = focused || hasValue;
    const inputId = id || label.replace(/\s+/g, "-").toLowerCase();

    return (
      <div className="relative">
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          className={cn(
            "peer w-full rounded-(--radius-md) px-4 pt-7 pb-3 text-sm outline-none border transition-colors resize-none",
            "bg-surface border-border text-text",
            "focus:border-primary focus:ring-2 focus:ring-(--primary)/20",
            error && "border-danger focus:border-danger focus:ring-(--danger)/20",
            className,
          )}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(!!e.target.value);
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            props.onChange?.(e);
          }}
          {...props}
        />
        <label
          htmlFor={inputId}
          className="absolute left-4 pointer-events-none transition-all duration-200"
          style={{
            top: active ? "12px" : "16px",
            transform: active ? "translateY(0) scale(0.75)" : "translateY(0) scale(1)",
            transformOrigin: "left top",
            color: focused ? "var(--primary)" : "var(--muted)",
          }}
        >
          {label}
        </label>
      </div>
    );
  },
);
FloatingTextarea.displayName = "FloatingTextarea";