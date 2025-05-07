import React from "react";

export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 mt-2.5 px-4 py-5 text-center dark:bg-white/[0.03]`}
    >
      <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
        Jonathan Pulido
      </h3>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        <a
          href="mailto:jonathan.pulido@vitolen.com"
          className="text-blue-500 hover:underline"
        >
          jonathan.pulido@vitolen.com
        </a>
      </p>
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        <a
          href="https://wa.me/5491168204419"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center text-green-500 hover:text-green-600"
        >
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              width="20"
              height="20"
            >
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.837.74 5.623 2.14 8.07L.001 32l8.14-2.14A15.92 15.92 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.44c-2.55 0-5.05-.66-7.25-1.91l-.52-.3-5.18 1.37 1.37-5.18-.3-.52A13.44 13.44 0 012.56 16c0-7.33 5.97-13.44 13.44-13.44 7.33 0 13.44 5.97 13.44 13.44 0 7.33-5.97 13.44-13.44 13.44zm7.36-10.44c-.41-.2-2.42-1.2-2.8-1.34-.37-.13-.64-.2-.91.2-.27.4-1.05 1.34-1.29 1.61-.24.27-.48.3-.89.1-.41-.2-1.73-.64-3.3-2.05-1.22-1.09-2.05-2.44-2.29-2.85-.24-.41-.03-.63.18-.83.18-.18.41-.48.61-.72.2-.24.27-.41.41-.68.14-.27.07-.5-.03-.72-.1-.2-.91-2.2-1.25-3.02-.33-.8-.67-.69-.91-.7h-.77c-.24 0-.63.1-.96.48-.33.37-1.26 1.23-1.26 3 0 1.77 1.29 3.48 1.47 3.73.18.24 2.53 3.87 6.14 5.43.86.37 1.53.59 2.05.76.86.27 1.64.23 2.26.14.69-.1 2.42-.99 2.76-1.95.34-.96.34-1.79.24-1.95-.1-.17-.37-.27-.77-.48z" />
            </svg>
          </span>
          +5491168204419
        </a>
      </p>
      <a
        href="https://gestion.vitolen.com/session/new"
        target="_blank"
        rel="nofollow"
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600"
      >
        Hacer Pedido
      </a>
    </div>
  );
}
