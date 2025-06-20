# My Family Recipe App 🍲

A personal digital cookbook for preserving, organizing, and sharing cherished family recipes, powered by AI-driven OCR and modern web technologies.

## ✨ Live Demo

Experience the app live here: **[Your Netlify Live URL Here](https://[your-site-name].netlify.app/)**

*(Replace `[Your Netlify Live URL Here]` with the actual URL provided by Netlify, e.g., `https://r3cipevault.netlify.app`)*

## 🚀 Features

* **Recipe Management:** Add, view, edit, and delete your favorite recipes.
* **Serving Size Converter:** Easily adjust ingredient quantities for different serving sizes.
* **AI-Powered OCR (Optical Character Recognition):** Upload photos of handwritten or printed recipes and let Gemini AI extract ingredients and instructions automatically.
* **Personalization:** Customize the app's background theme to your liking (preferences saved to Firebase).
* **Public/Private Recipes:** Mark recipes as private (only for your authenticated session) or public (shareable across your app instance's users).
* **Real-time Data Sync:** All recipe and preference data is stored and synced in real-time using Firebase Firestore.
* **Anonymous Authentication:** Users are automatically signed in anonymously to manage their private data, or they can use a shared "initial auth token" for collaborative recipe management (if configured).

## 🛠️ Tech Stack

* **Frontend:** [React](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Backend Services:** [Google Firebase](https://firebase.google.com/)
    * **Authentication:** Firebase Authentication (Anonymous, Custom Token)
    * **Database:** Cloud Firestore
* **AI Integration:** [Google Gemini API](https://ai.google.dev/models/gemini) (for OCR)
* **Deployment:** [Netlify](https://www.netlify.com/)

## ⚡ Getting Started

Follow these steps to get a local copy of the project up and running on your machine.

### Prerequisites

* Node.js (LTS version recommended) and npm (Node Package Manager).
* Git (for version control).
* A Google account with access to [Firebase Console](https://console.firebase.google.com/) and [Google AI Studio](https://aistudio.google.com/app/apikey).
* **Chromebook Users:** Ensure [Linux (Beta)](https://support.google.com/chromebook/answer/9145439) is enabled.

### 1. Clone the Repository

```bash
git clone [https://github.com/](https://github.com/)[Your Username]/my-recipe-app-mm84.git
cd my-recipe-app-mm84

### 2. Environment Variables Setup

Create a `.env` file in the **root** of your project and populate it with your application's API keys and configuration. This file is ignored by Git for security.

1.  **Create `.env` file:**
    ```bash
    touch .env
    ```
2.  **Add content to `.env`:**
    ```dotenv
    # .env file in the root of your my-recipe-app project

    # A unique identifier for your application's data within Firebase Firestore.
    # Choose any unique string, e.g., "my-family-cookbook-v1".
    VITE_APP_ID="[Your Chosen App ID]"

    # Your Firebase Configuration Object.
    # IMPORTANT: Do NOT paste your actual keys here in the README.md!
    # Users must obtain their own config from Firebase Console > Project settings > Your apps > Web app > Config.
    # The value MUST be a single-line JSON string, enclosed in single quotes.
    VITE_FIREBASE_CONFIG='{"apiKey": "YOUR_API_KEY_FROM_FIREBASE", "authDomain": "YOUR_AUTH_DOMAIN", "projectId": "YOUR_PROJECT_ID", "storageBucket": "YOUR_STORAGE_BUCKET", "messagingSenderId": "YOUR_MESSAGING_SENDER_ID", "appId": "YOUR_WEB_APP_ID", "measurementId": "YOUR_MEASUREMENT_ID"}'

    # An optional initial authentication token. Set to "null" without quotes if not used.
    # If set to a string, it will attempt custom token sign-in.
    VITE_INITIAL_AUTH_TOKEN=null

    # Your Google Gemini API Key for OCR functionality.
    # IMPORTANT: Do NOT paste your actual key here in the README.md!
    # Users must obtain their own key from Google AI Studio: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
    VITE_GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
    ```
    *(For your own `.env` file that you use locally and for Netlify, you *will* use your actual keys. But in this `README.md` file, you provide placeholders and instructions for others.)*

---

**After replacing the section in your `README.md`:**

1.  **Save the `README.md` file.**
2.  **Go to your Linux Terminal.**
3.  **Stage and commit these changes:**
    ```bash
    git add README.md
    git commit -m "docs: Update README.md with secure env setup instructions"
    ```
4.  **Push your changes to GitHub:**
    ```bash
    git push origin main
    ```
### 3. Install Dependencies

Once you've set up the `.env` file, install the project's dependencies:

```bash
npm install

#### 4 Run the Development Server

npm run dev

🌐 Deployment
This application is set up for continuous deployment with Netlify.

Netlify Deployment
Connect to GitHub: Link your GitHub repository to your Netlify account.
Build Settings:
Build command: npm run build
Publish directory: dist
Environment Variables: Add VITE_GEMINI_API_KEY to Netlify's UI under Site settings > Build & deploy > Environment.
Secrets Scanning: Add SECRETS_SCAN_ENABLED with value false as an environment variable in Netlify to bypass secrets scanning for client-side API keys.
Push to main branch: Any push to the main branch will automatically trigger a new deployment.
Firebase Hosting (Alternative)
This project is also compatible with Firebase Hosting.

Install Firebase CLI: npm install -g firebase-tools
Login: firebase login
Initialize: firebase init (select Hosting, use dist as public directory, configure as SPA).
Build: npm run build
Deploy: firebase deploy --only hosting

📊 Project Structure
my-recipe-app/
├── public/                # Static assets (index.html, vite.svg)
├── src/                   # All React source code
│   ├── components/        # Individual UI components
│   │   ├── AddEditRecipeForm.jsx
│   │   ├── HomeComponent.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Modal.jsx
│   │   ├── OCRInput.jsx
│   │   ├── RecipeDetail.jsx
│   │   ├── RecipeList.jsx
│   │   ├── ServingSizeConverter.jsx
│   │   └── SettingsPage.jsx
│   ├── contexts/          # React Contexts for global state & Firebase integration
│   │   ├── AuthContext.jsx
│   │   ├── FirestoreContext.jsx
│   │   ├── RecipeContext.jsx
│   │   └── UserPreferencesContext.jsx
│   ├── utils/             # Utility functions (e.g., fraction parsing)
│   │   └── helpers.js
│   ├── App.jsx            # Main application logic and routing
│   ├── RootApp.jsx        # Entry point for context providers
│   ├── main.jsx           # React app renderer
│   └── index.css          # Global CSS (including Tailwind directives)
├── .env                   # Environment variables (local, not committed to Git)
├── .gitignore             # Files ignored by Git
├── package.json           # Project metadata and dependencies
├── postcss.config.js      # PostCSS configuration for Tailwind
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.js         # Vite build tool configuration

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/[Your GitHub Username]/my-recipe-app-mm84/issues).

📄 License
This project is Unlicensed by default. If you wish to license your code, you can add a LICENSE file to the root of your project. The MIT License is a common and permissive choice.

📞 Contact
Winsome Keeper - [Your Email Address]


&lt;br/>
(Version: 0.1.0-dev.20250620)