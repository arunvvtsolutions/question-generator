

export const ApiEndpoint = {
  // Authentication
  AUTH: {
    BASE: 'api/authentication',
    SIGN_IN: 'api/authentication/sign_in',
    VERIFY_USER: 'api/authentication/verify_user',
  },

  // NEET Resources
  NEET: {
    BASE: 'api/neet',
    SYLLABUS: {
      BASE: 'api/neet/syllabus',
      CHAPTERS: 'api/neet/syllabus/chapters',
      TOPICS: 'api/neet/syllabus/topics',
      SUBJECTS: 'api/neet/syllabus/subjects',
    },
    SEARCH: 'api/neet/search',
    BOOK_DETAILS: 'api/neet/book-introduction',
  },

  // NCERT Solutions
  NCERT: {
    BASE: 'ncert-solutions',
    METADATA: 'ncert-solutions/meta-data',
  },

  // AI Modules
  AI: {
    DOUBT: 'api/ai/doubt-module',
    ADMISSION: 'api/ai/admission-module',
    COMMON_DOUBT: 'api/ai/common-doubt-module',
    PROMPTS: 'api/ai/prompts',
    STUDY_PLAN: 'api/ai/study-plan-module',
    USER_TOKENS: '/api/ai/user-tokens',
    WORK_LIBRARY: '/api/ai/work-library',
  },



  // Chatbots
  CHATBOT: {
    NEET_DOUBT: 'neet-chapterwise-bot',
    STUDY_PLAN_DOUBT: 'neet-chapterwise-studyplan-bot',
    ADMISSION: 'neet-predictor-bot',
    COMMON_NEET_DOUBTS: 'neet-common-bot',
  },

  // Study Plan
  STUDY_PLAN: {
    GENERATE_AI: 'neet_study_plan',
    GENERATE: 'api/study-plan/generate-study-plan',
    INSTRUCTIONS: 'api/study-plan/study-plan-instructions',
  },

  // S3 Upload
  S3: {
    UPLOAD: 'api/s3-upload',
  },

  // Payment
  PAYMENT: {
    INITIALIZE: 'api/payment/initiate',
    PRODUCTS: 'api/payment/products',
    HISTORY: 'payment-history',
  },

  // Dashboard
  DASHBOARD: {
    BASE: 'api/dashboard',
    HOME: 'api/dashboard/home',
    DASHBOARD_HOME: 'api/dashboard/dashboard-home',
  },

  // Exams
  EXAM: {
    BASE: 'api/exams',
    CREATE: 'create-exam',
    SUBMIT: 'submit-exam',
    RESUME: 'resume-exam',
    LEAVE: 'leave-exam',
    GENERATE_RESULT: 'generate-result',
    QUESTIONS: 'generate-result/questions',
    USER_RESULT: 'get-user-exam-result',
    CUMULATIVE: 'cumulative-exam',
    GET: 'get-exam',
    STATUS: 'exam-status',
    ANALYSIS: 'generate-analysis',
    PRACTICE_NOW: 'practice-now',
    RESULT_ANALYSIS: 'result-analysis',
  },

  // Progress
  PROGRESS: {
    POST: 'api/neet',
  },

  // Question Bank
  QUESTION_BANK: {
    GENERATE: 'api/q-bank/generate-questions',
    VIEW_GENERATED: 'api/q-bank/view-generatedQsts',
    PRACTICE_TYPES: 'api/q-bank/generate-questions/question-types',
  },
};

export const Api_endpoint = {
  user_auth: 'api/authentication',
  user_signIn: 'api/authentication/sign_in',
  user_verification: 'api/authentication/verify_user',
  neet: 'api/neet',
  ncert_solutions: 'ncert-solutions',
  ncert_page_metadata: 'ncert-solutions/meta-data',
  // syllabus
  get_syllabus: 'api/neet/syllubus',
  get_search_result: 'api/neet/search',
  get_all_chapters: 'api/neet/syllubus/chapters',
  get_all_topics: 'api/neet/syllubus/topics',
  get_all_subjects: 'api/neet/syllubus/subjects',
  // home
  get_books_details: 'api/neet/book-introduction',
  // ------- python ai endpoints -----------
  ai_doubt_module: 'api/ai/doubt-module',
  ai_ask_admissions: 'api/ai/admission-module',
  ai_common_doubt_module: 'api/ai/common-doubt-module',
  ai_pyqs_doubt_module: 'api/ai/neet-pyq-bot',
  ai_prompts: 'api/ai/prompts',
  doubt_module: 'neet-chapterwise-bot',
  ai_plans_doubt_module: 'api/ai/study-plan-module',
  // ----------- PYQ'S AI api endpoint -----------
  ai_pyq_neet_doubts: 'neet-pyq-bot',
  // ----------- study plan AI api endpoint -----------
  ai_study_plan_ask_your_doubts: 'neet-chapterwise-studyplan-bot',
  admission_module: 'neet-predictor-bot',
  ai_common_neet_doubts: 'neet-common-bot',
  ai_user_tokens: '/api/ai/user-tokens',
  ai_work_library: '/api/ai/work-library',
    // ----------- generate Question AI api endpoint -----------
    generate_ai_question: 'neet_cs_question_bank',
     // ----------- Improve Question AI api endpoint -----------
    improve_ai_question: 'cs_qbank_improved_question',
  // s3 upload
  s3_upload: 'api/s3-upload',
  // Progress
  postProgress: 'api/neet',
  //payment
  payment_initialization: 'api/payment/initiate',
  payment_products: 'api/payment/products',
  // ------------- exam api path names ------------
  exam_api: 'api/exams',
  create_exam: 'create-exam',
  submit_exam: 'submit-exam',
  resume_exam: 'resume-exam',
  leave_exam: 'leave-exam',
  generate_exam_result: 'generate-result',
  get_exam_qst_data: 'generate-result/questions',
  get_exam_result: 'get-user-exam-result',
  cumulative_exam: 'cumulative-exam',
  get_exam: 'get-exam',
  get_exam_status: 'exam-status',
  generate_analysis: 'generate-analysis',
  practice_now: 'practice-now',
  user_result_analysis: 'result-analysis',
  quiz_exam: 'quiz-exam',

  // dashboard
  user_dashboard: 'api/dashboard',
  user_payment_history: 'payment-history',
  user_dashboard_home: 'api/dashboard/dashboard-home',

  // home
  dashboard_home_todays_schedule: 'api/dashboard/home/today-schedule',
  // study plan
  generate_ai_study_plan: 'neet_study_plan',
  generate_study_plan: 'api/study-plan/generate-study-plan',
  generate_study_plan_two: 'api/study-plan/generate-study-plan-two',
  get_study_plan_instructions: 'api/study-plan/study-plan-instructions',
  get_study_plan_list: 'api/study-plan/study-plan-list',
  study_plan_access: 'api/study-plan/study-plan-access',
  create_study_plan : 'api/study-plan/create-study-plan',
  // generate question
  generate_questions: 'api/q-bank/generate-questions',
  improve_questions: 'api/q-bank/generate-questions/improve-question',
  view_questions: 'api/q-bank/view-generatedQsts',
  get_cognitive_level:'api/q-bank/cognitive_level',
  get_all_ai_questions:'api/q-bank/view-ai-questions',
  get_single_ai_questions:'api/q-bank/view-ai-questions/view-single-ai-question',

  // get tocken details
  get_token_details:'api/token-related',
  // dahsboard
  dashboard_home: 'api/dashboard/home',
  // chat history
  chat_history: 'api/chat-history',
  //blog
  get_all_blogs: 'api/blog',
  //faculty
  getFacultyData:'api/faculty',

  //flash card
  get_all_subjects_and_chapter: '/api/flash-card',


  // streams
  get_all_streams: 'api/stream',

  // question types
  get_question_types: 'api/question-type',
};




