
export enum PDF_DOWNLOAD_ERROR {
    PDF_CANT_DOWNLOAD = 'Please select at least one section before downloading.',
  }
  

  
export enum DASHBOARD_HOME {
    PERSONALIZED_STUDY_PLAN = 'Personalized Study Schedule',
    RECENT_ACTIVITY = 'Recent Activity',
    AI_LEARNING_COACH = 'AI Learning Coach',
    QUICK_DOUBTS_AI = 'Quick Doubts AI',
    PERSONALIZED_INSIGHTS = 'Personalized insights',
    INSTANT_RESPONSES = 'Instant responses',
    FIVE_DAY_STREAK = '5-day streak',
    VIDEO_SOLUTIONS = 'Video Solutions',
    STUDY_MATERIAL = 'Study Material',
    BOOK_A_SESSION = 'Book a Session',
    WATCH_DETAILED_SOLUTION_VIDEOS = 'Watch detailed solution videos',
    ACCESS_COMPREHENSIVE_NOTES = 'Access comprehensive notes and guides',
    SCHEDULE_ONE_ON_ONE_SESSIONS = 'Schedule one-on-one sessions',
    EXPERT_SOLUTIONS = 'Expert Help & Support',
    DESCRIPTION = 'Get personalized guidance based on your performance',
    AI_COACH = 'AI Coach Available',
    AVAILABLE = '24/7 available',
    AI_COACH_TITLE = 'AI Coach',
    AI_COACH_DESC = 'Personalized guidance based on your performance',
    LEARNING_STREAK = 'Learning Streak',
    AVERAGE_STUDY_TIME = 'Average Study Time',
    RECENT_TEST_SCORE = 'Recent Test Score',
    RECOMMENDED_ACTIONS = 'Recommended Actions',
    LEARNING_RESOURCES = 'Learning Resources',
    LEARNING_RESOURCES_DESC = 'Access specialized tools and materials for effective learning',
    CHAPTER_WISE_BOT = 'Chapter Wise Bots',
    CHAPTER_WISE_BOT_DESC = 'AI assistants specialized in specific chapters',
    STUDY_MATERIAL_DESC = 'Comprehensive notes and study guides',
  }
  
  
  
export enum EXAM_COMPARISON_STATUS {
    INCREASED = 'increased',
    DECREASED = 'decreased',
    STABLE = 'stable ',
  }
  

  
export enum RESULT_ANALYSIS {
    TOTAL_TEST_TIME = 'Total test time :',
    TIME_TAKEN = 'Time Taken: ',
    AVG_TIME_QUES = 'Avg time per question :',
    MARK_SCORED = 'Marks scored:  ',
    TOTAL_MARK = 'Total marks: ',
    MARKS = 'Marks',
  }
  
  

  export enum NEET_SCORE {
    CORRECT = 4,
    WRONG = -1,
    LEFT = 0,
  }
  
  export enum EXAM_STATUS {
    COMPLETED = 1,
    NOT_COMPLETED = 0,
  }
  
  export enum EXAM_GENERATE_RESULT {
    TIME_TAKEN_TITLE = 'Time Taken',
    TOTAL_TIME = 'Total test time :',
    TIME_TAKEN = 'Time taken :',
    AVG_TIME_PER_QST = 'Avg time per question :',
  }  

  
export enum CREATE_STUDY_PLAN {
    SELECT_CHAPTERS = 'Select Chapters',
    SELECT_SUBJECTS = 'Select Subjects',
    SELECT_TOPICS = 'Select Topics',
    DESCRIPTION = 'Description',
    START_DATE = 'Start Date',
    END_DATE = 'End Date',
    HOWMANY_HRS_STUDY = 'How many Hours you study in a day',
    SKIP_WEEK_DAYS = 'Will skip week days',
    PLAN_UR_SCHEDULE = 'Plan Your Schedule',
    SUBJECT = 'Subject',
    CHAPTER = 'Chapter',
    TOPIC = 'Topic',
    MILESTONE = 'Milestone',
    FORM = 'Form',
    CREATE = 'create',
    EDIT = 'edit',
    SHOW_ALL = 'Show All',
    STUDY_PLAN_NOT_GEN = ' Study Plan Not Generated',
    START_NOW = 'Start Now',
    SELECT_EXAM_DIFFICALTY = 'Select Exam Difficulty',
    SELECT_EXAM_DIFFICALTY_SUBTITLE = '  Use the slider below to select the difficulty level for your exam. It will change color based on your selection',
    CUMULATIVE_TEST = 'Cumulative Test',
    HOW_GOOD_YOUR_ARE_SUBJECT = 'How good you are in %subject% ?',
    STUDY_PLAN_NOT_GENERATED = 'Unable to Generate New Study Plan',
    NEXT = 'Next',
    PREVIOUS = 'Previous',
    SUBMIT = 'Submit',
    GENERATING = 'Generating...',
    CUMULATIVE_EXAM_INFO = 'cumulativeExamInfo',
    CHAPTER_LIST = 'chapterList',
    RE_TEST = 'Retake',
    RESULT = 'Result',
    GENERATE_QUES_FOM = 'Generate Questions Form',
    GENERATE_QUES = 'Generate Questions',
    TOTAL_QUES = 'Total Questions',
    EASY = 'Easy',
    MEDUIM = 'Medium',
    HARD = 'Hard',
    ACTIVE_PYQ = 'Test Based on PYQs',
    HEADING = "Generate Question Paper"
  }
  
  export enum SUBJECTS {
    PHYSICS = 'Physics',
    CHEMISTRY = 'Chemistry',
    BIOLOGY = 'BIOLOGY ',
  }
  
export enum STUDY_PLAN_STATUS_PERC {
    IS_TOPICS_COMPLETED = 50,
    IS_EXAM_COMPLETED = 50,
  }
  
  export enum EXAM_BUTTONS {
    SUBMIT = 'Submit',
    PREVIOUS = 'Prev',
    SAVE_AND_NEXT = 'Save & Next',
    UNMARK_FOR_REVIEW = 'Un Mark for review',
    MARK_FOR_REVIEW = 'Mark for Review',
    LEAVE_TEST = 'Leave test',
    SUBMIT_TEST = 'Submit test',
  }
  
  export enum EXAM_ERROR {
    EXAM_NO_AVILBLE = "Couldn'd find the exam",
    EXAM_ALREADY_ATTENDED = 'Exam already attended by this user',
    CANNOT_ATTEND_EXAM = 'This exam currently not available',
    MAXIMUM_ATTEMPTS_COMPLETED = 'You have reached the maximum number of attempts for this exam.',
    EXAM_RESULT_NOT_AVAILABLE = "Couldn't find the result.",
  }
  

  
export enum SIDEBAR {
  REVISION_NOTES = 'Revision Notes',
  IMPORTANT_FORMULAS = 'Important formulas',
  START_AI_POWERED_LESSON = 'Start AI Powered Lesson',
  WORK_BOOK = 'Previous Chats',
  WORK_BOOK_EMPTY = 'Your work book is empty',
  MCQ_EXAM = 'Full Mock Test',
  STUDY_PLAN = 'Study Plan AI',
  CREATE_STUDY_PLAN = 'Create Study Plan',
  EDIT_PLAN = 'Edit Plan',
  HOW_TO_USE = 'How to Use:',
  TO_START = 'To start your personalized learning journey, simply click on',
  UNDER_CHAPTER = 'under each chapter.',
  SHOWMORE_CHAPTERS = 'Show More Chapters',
  SHOWLESS_CHAPTERS = 'Show More Chapters',
  START = 'Start',
  AI_POWERED_LESSON = 'AI Powered Lesson',
  GENERATE_MCQS = 'Generate Questions',
  VIEW_ALL_GENERATED_QSTS = 'View Questions',
  CUSTOMISE_UR_TEST = 'Customise your Test',
  START_UR_PRACTICE = 'Start Your Practice',
  VIEW_COMPLETED_TEST = 'View Completed Test',
  GENERATE_TEST = 'Generate Questions',
  BLOG_SIDEBAR = 'NEET Blogs',
  CLEAR_DOUBTS_TEST = 'Clear Doubt Test ',
  ON_ADMISSION = 'On Admission',
  BACK_TO_DASHBOARD = 'Back To Dashboard',
  CHAPTER_WISE_QUIZ = 'Chapter Wise Quiz',
  FLASH_CARDS ='Flash Cards',
  VIEW_QUESTIONS = "View Generated Questions",
  DASHBOARD = "Dashboard"
}


export enum CHAT {
  ASK_QUES = 'Ask Your Doubts',
  LOGIN_ASK_QUESTION = 'Login to ask your questions',
  ASK_DOUBTS_FROM = 'Ask Doubts from',
}
export enum PATHNAMES {
  NCERT_PATH = 'ncert-solutions',
  STUDY_NOTES = 'study-notes',
}



export enum BOT_TYPE {
  COMMON_BOT = 1,
  ASK_DOUBTS = 2,
  MCQ = 3,
  ASK_ADMISSIONS = 4,
  STUDY_PLAN_BOT = 5,
  PYQs_BOT = 6,
}

export enum AI_PATH_NAMES {
  NEET_MENTOR = 'neet-mentor',
  ASK_DOUBTS = 'ask-your-doubts',
  ASK_ADMISSIONS = 'ask-about-admissions',
  STUDY_PLAN_BOT = 'study-plan/ask-your-doubts',
  PYQS_DOUBTS_AI = 'pyq-doubt-ai',
}

export enum TOPIC_MASTRY_LEVEL {
  EXPERT = 80,
  PROFITIENT = 60,
  IMPROVING = 40,
  NEEDS_TO_WORK = 0,
}

export enum MAX_LEVEL {
  SUBJECT_DIFFICULTY_LEVEL = 180,
  GENERATE_QUESTION_LEVEL = 100,
  MAX_STUDY_PLAN_GEN = 3,
  MAX_REQUIRED_RESULT = 5,
  MAX_NEET_MARK = 720,
  MAX_WEIGHTAGE_PERCENT = 70,
  PERCENT = 100,
  MAX_NEET_QUESTION = 200,
}

export enum OPTIONS {
  OPTION_A = '1',
  OPTION_B = '2',
  OPTION_C = '3',
  OPTION_D = '4',
}

export enum ChapterProgressContent {
  CHAPTER = 'Chapter',
  COMPLETED = '% Completed',
  CHAPTER_RANKED_QUIZ = 'Chapter Ranked Quiz',
  UNLOCK = 'Unlock at 80% progress',
  CURRENTLY_AT = 'Currently at ',
}

export enum PAYMENT {
  MERCHANT_ID = 'merchantId',
  TRANSACTION_ID = 'transactionId',
  PAYMENT_SUCCESS_STATUS = 'PAYMENT_SUCCESS',
  PAYMENT_INITIALIZED = 'Initialized',
  PHONE_PE = 'Phone Pe',
}

export const FOCUS_SIDEBAR_ROUTES = [
  'neet-mentor',
  'ask-your-doubts',
  'revision-notes',
  'important-formulas',
  'ask-about-admissions',
  'chapter-bots',
  'pyq-doubt-ai',
];

export enum PRICING_TITLES {
  DOUBTS = 'Credits',
  PLANS = 'PLANS',
  APPLY = 'Apply',
  BUYNOW = 'Buy Now',
  PRICING_PLANS = 'Pricing Plans',
  PRICING_CONTENT = ' Our pricing plans are designed to be affordable, flexible, and tailored to your unique needs.',
  PAYMENT_SUCCESS = 'Payment Success',
  PAYMENT_FAILED = 'Payment Failed',
  TRY_AGAIN = 'Try Again',
  BACK_HOME = 'Back to Home',
  BACK = 'Back',
}

export enum CCAvenueConstants {
  WORKING_KEY = 'working_key',
  PLAIN_TEXT = 'Plain text',
  WORKING_KEY_TXT = 'Working Key',
  ENCRYPTED_TEXT = 'Encrypted text',
  MERCHANT_ID = 'merchant_id',
  SUCCESS = 'Success',
}

export enum PAYMENT_STATUS {
  SUCCESS = 'Success',
  FAILED = 'Failed',
  ABORTED = 'Aborted',
}

export enum TransactionTitles {
  S_N = 'S/N',
  ORDER_ID = 'Order ID',
  TOKENS = 'Credits',
  PAYMENT_TYPE = 'Payment Type',
  AMOUNT = 'Amount',
  DATE = 'Date',
  TRANSACTION_HISTORY = 'Transaction History',
  A_LIST_RECENT_TRANSACTION = 'A list of your recent transactions.',
  NO_DATA_FOUND = 'No Data Found',
  TRACKING_ID = 'Tracking ID',
  PACKAGE = 'Package Name',
}

export enum EXAM_TIME {
  PER_QST_TIME = 1,
  EXT_TIME = 10,
}

export enum REDUCING_TOKEN_COUNT {
  IMG = 5,
  MSG = 1,
  GO_HIGH_LEVEL_MAX = 10,
  GO_HIGH_LEVEL_MIN = 1,
  IMPROVE_QUESTION_TOKEN_DEDUCT_COUNT = 1
}

export enum EXAM_ANALYSIS_RESULT {
  OVERALL_SCORE = 'Overall Score',
  BASED_ON_ALL_INDIA_RANK = 'Based On All India Rank',
  TOTAL_MCQS = 'Total Mock Test',
  CORRECT = 'Correct',
  WRONG = 'Wrong',
  LEFT = 'Left',
  SECTION = 'Section',
  QUESTION = 'Question',
  EXPLAINATION = 'Explanation',
  CREATE_STUDY_PLAN = 'Create Study Plan',
}




export enum COUNTRY_CODE {
  INDIA = '91',
}

export enum RESULT_SECTIONS {
  PERFORMANCE = 'performance',
  OVERALL_SCORE = 'overallscore',
  SUBJECT_ANALYSIS = 'subjectAnalysis',
  QUESTION_ANALYSIS = 'questionAnalysis',
  TIME_MANAGEMENT = 'timeManagement',
  TOPIC_MASTRY_ANALYSIS = 'topicMastryAnalysis',
  RANK_ANALYSIS = 'rankAnalysis',
}

export enum AUTHENTICATION {
  ALREADY_ACC_EXIST = 'Already have an account?',
  DONT_HAVE_AN_ACC = 'Don’t have an account?',
  SIGN_IN = 'Sign In',
  SIGN_UP = 'Sign Up',
  LOGGED_IN_FAILED = 'Login failed.',
  WELCOME = 'Welcome to NEET Guide',
  SIGN_IN_CONTINUE = 'Sign In to Continue.',
  SIGN_UP_CONTINUE = 'Sign Up to Continue.',
  CONTINUE = 'Continue',
  MOBILE_NO = 'Mobile Number',
  ENTER_OTP = 'Enter your OTP',
  WANT_TO_GO_BACK_LOGIN = 'Do you want to go back to login page? ',
  CLICK_HERE = ' Click here',
  LOGGED_IN_SUCCESSFULL = 'Login successfully.',
  LOGGED_IN_SUCCESS_MESSAGE = 'You have logged in successfully.',
  LOGOUT = 'Log out',
  USER_MOB_NO = 'userPhoneNo',
  USER_FROM_WEB = 'isAuthFromWeb',
  TRANSACTION_HISTORY = 'Transaction History',
}

export enum ERROR {
  SOMETHING_WENT_WRONG = 'Something went wrong',
  NOT_AUTHORIZED = 'Not authorized',
  NOT_AUTH_MSG = 'You are not logged in, please log in to continue.',
  NO_DATA_FOUND = 'No Data Found',
  NOT_A_VALID_USER = "Couldn't find authtoken or not a valid token",
  TOKENS_COMPLETED = 'Not having enough Credits',
  PAYMENT_FAILED = 'Unable to process your payment at this time. Please check your details and try again',
  CANNOT_DOWNLOAD = `Can't Download`,
}

export enum SUCCESS_MESSAGES {
  UPDATE = 'Updated Succesfully',
}

export enum HOMEPAGE {
  READ = 'Read',
  OVER_VIEW = 'Overview',
  EXPAND = 'Expand',
  CLOSE = 'Close',
  WELCOME_TITLE = 'Welcome to NEET Guide',
  WELCOME_DESC = `Welcome to NEET Guide, your ultimate resource for acing the NEET
                exam! Explore our comprehensive study materials, interactive
                practice tests, and expert tips to excel in Physics, Chemistry,
                and Biology. Join our community and start your journey to
                success today!`,
  ULTIMATE = 'Your Ultimate',
  NEET_PARTNER = 'NEET Prep Partner',
  GUIDENCE_AT_FIGER_TIP = 'Expert Guidance at Your Fingertips',
  ASK_DOUBTS = 'Ask, learn, and excel with our AI-Powered Chatbot',
  CHAT_NOW = 'Chat Now',
  EXPLORE_NEET = 'Explore NEET',
  AI_POWERED = 'AI-Powered',
  LESSONS_BY_CHAPTER = 'Lessons by Chapter',
  AI_DESC = `Jump into our easy-to-follow, chapter-wise lessons powered by AI to
          help you master Physics, Chemistry, and Biology for your NEET exam.
          These lessons make tough concepts simple, allowing you to learn
          comfortably and at your own speed.`,
  HOW_TO_USE = 'How to Use:',
  TO_START = 'To start your personalized learning journey, simply click on',
  START_AI_POWERED_LESSON = 'Start AI Powered Lesson',
  UNDER_CHAPTER = 'under each chapter.',
  SHOWMORE_CHAPTERS = 'Show More Chapters',
  SHOWLESS_CHAPTERS = 'Show Less',
}




export enum TOKEN_MANAGEMENT {
  AI_TEXT = 'ai_text',
  AI_PREDICTOR = 'ai_predictor',
  AI_ASSET = 'ai_asset',
  FULL_TEST = 'full_test',
  MINI_TEST = 'mini_test',
  USER_REGISTER = 'user_register',
  DEFAULT = 0,
}

export enum AI {
  ERROR_MESSAGE = "I'm sorry, but I'm unable to provide an answer to that question right now. If you have any other questions or need assistance with something else, feel free to ask!",
  CHAT_HISTORY_EMPTY = 'Chat history is empty',
  TOKENS_COMPLETED = 'Not having enough Credits',
  TOKENS_COMPLETED_DES = 'Your Credits are completed. Kindly pay to continue.',
  ASK_DOUBTS = 'Ask doubts',
  DOUBTS_AI = 'NEET Doubts AI',
  PYQS_DOUBTS_AI = "PYQ’s Pro AI",
  ADMISSION_BOT = 'AI NEET Predictor',
  START_UR_CHAT = 'Hello, How can i help you today',
  TOKEN_COUNT = 'Available Credits :',
  FOR_MORE_TOKENS = 'For More Credits',
  BUY_NOW = 'Buy Now',
  AI_SESSION_KEY = 'ai-initial-msg',
  THREAD_KEY = 'CS',
  ASK_ANYTHNG_ABT_NEET_EXAM = 'AI NEET Predictor',
  PLACE_HOLDER = "Hi! I'm your AI NEET Predictor.",
  SUB_PLACE_HOLDER = 'How can I help you with college admissions, counseling, or predictions today?',
  TEXT_AREA_PLACEHOLDER = 'Instant NEET help - college predictions, counseling & admissions',
}

export enum EXAM {
  QST_NOT_VISITED = 'Question Not visited',
  QST_ANSWERED = 'Question Answered',
  QST_NOT_ANSWERED = 'Question Not Answered',
  QST_ANS_AND_MARKED = 'Question Answered & Marked For Review',
  QST_MARKED = 'Question Marked For Review',
  QUESTIONS = 'Question',
  LEAVE_EXAM_CONTENT = 'Are you sure, Do you want',
  LEAVE_EXAM = 'Leave the exam?',
  SUBMIT_EXAM_CONTENT = 'Are you sure, Do you want to submit the test ?',
  EXAM_INSTRUCTION_TITLE = 'Exam Overview and Instructions',
  QST_NOT_AVAILABLE = 'Question Not Available',
  OPT_NOT_AVAILABLE = 'Option Not Available',
}

export enum EXAM_TYPE_SHORTURLS {
  BENCHMARK_TEST = 'benchmark-test',
  MCQ_TEST = 'mcq-test',
  CUMULATIVE_TEST = 'cumulative-test',
  PRACTICE_NOW = 'practive-now',
}

export enum EXAM_TEST_TYPE {
  FIXED_TYPE = 0,
  VARY_TYPE = 1,
}


export enum STUDY_PLAN_TOKEN {
  CREDITS_PER_PAID_SP = 50,
  CREDITS_PER_FREE_SP = 0,
}