<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ config('app.name', 'FINCOOP') }}</title>
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="32x32" href="/web-app-manifest-192x192.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/web-app-manifest-512x512.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
    <style>
        #fincoop-splash {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            background: #f9fafb; /* gray-50 to match your theme */
            transition: opacity 0.35s ease;
        }

        #fincoop-splash.fade-out {
            opacity: 0;
            pointer-events: none;
        }

        /* Rotating ring */
        .fincoop-splash-spinner {
            position: relative;
            width: 72px;
            height: 72px;
        }

        .fincoop-splash-spinner::before {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 4px solid #dcfce7; /* green-100 */
        }

        .fincoop-splash-spinner::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 4px solid transparent;
            border-top-color: #166534;  /* green-800 */
            border-right-color: #166534;
            animation: fincoop-spin 0.9s linear infinite;
        }

        /* Center dot */
        .fincoop-splash-dot {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #f97316; /* orange-500 */
            animation: fincoop-pulse 1.2s ease-in-out infinite;
        }

        .fincoop-splash-label {
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            color: #166534;
            animation: fincoop-fade 1.5s ease-in-out infinite;
        }

        @keyframes fincoop-spin {
            to { transform: rotate(360deg); }
        }

        @keyframes fincoop-pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1);   opacity: 1; }
            50%      { transform: translate(-50%, -50%) scale(1.4); opacity: 0.7; }
        }

        @keyframes fincoop-fade {
            0%, 100% { opacity: 1; }
            50%      { opacity: 0.5; }
        }
        #app:empty {
            visibility: hidden;
        }
    </style>
</head>
<body class="font-sans antialiased">
    @inertia
    <div id="fincoop-splash">
        <div class="fincoop-splash-spinner">
            <div class="fincoop-splash-dot"></div>
        </div>
        <p class="fincoop-splash-label">Loading</p>
    </div>
    <script>
        (function () {
            const splash = document.getElementById("fincoop-splash");
            if (!splash) return;

            let removed = false;

            const removeSplash = () => {
                if (removed) return;
                removed = true;
                splash.classList.add("fade-out");
                setTimeout(() => splash.remove(), 350);
            };
            const app = document.getElementById("app");
            if (app && app.children.length > 0) {
                removeSplash();
                return;
            }

            // Watch for React to mount.
            const observer = new MutationObserver(() => {
                if (app && app.children.length > 0) {
                    observer.disconnect();
                    requestAnimationFrame(() => removeSplash());
                }
            });

            if (app) {
                observer.observe(app, {
                    childList: true,
                    subtree: false,   // only need direct children
                });
            }
            setTimeout(removeSplash, 5000);
        })();
    </script>
</body>
</html>