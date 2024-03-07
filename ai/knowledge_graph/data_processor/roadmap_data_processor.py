import google.generativeai as genai
import configparser
import json

# Fetch API key from config.ini
config = configparser.ConfigParser()
config.read('../ai/config/config.ini')

# Set up the API key
genai.configure(api_key=config['API']['key'])

# Set up the model
generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

# Safety settings
safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

# Get the JSON FIle
file_path = "data/scraped_raw_data/android_developer_roadmap.json"

# Read the JSON file
with open(file_path, 'r') as file:
    data = json.load(file)
print(data)
# model = genai.GenerativeModel(model_name="gemini-1.0-pro",
#                               generation_config=generation_config,
#                               safety_settings=safety_settings)

# prompt_parts = [
#   "input: {  \"Role\": \"Android Developer\",  \"Roadmap\": {    \"language\": [      \"Kotlin\",      \"Java\"    ],    \"development_IDE\": [      \"Android Studio\"    ],    \"version_control_systems\": [      \"Git\",      \"GitHub\",      \"GitLab\",      \"BitBucket\"    ],    \"build_tools\": [      \"Gradle\"    ],    \"fundamentals\": [      \"Basics of Kotlin\",      \"Basics of Object-Oriented Programming (OOP)\",      \"Data Structures and Algorithms\"    ],    \"app_components\": [      \"Activity and Activity Lifecycle\",      \"Services\",      \"Content Providers\",      \"Broadcast Receivers\",      \"Tasks and Back Stack\"    ],    \"user_interface\": {      \"layouts\": [        \"FrameLayout\",        \"LinearLayout\",        \"RelativeLayout\",        \"ConstraintLayout\",        \"RecyclerView\",        \"ListView\"      ],      \"components\": [        \"TextView\",        \"EditText\",        \"Buttons\",        \"ImageView\",        \"Dialogs\",        \"Bottom Sheet\",        \"DrawerLayout\",        \"Tabs\"      ],      \"navigation_and_intents\": [        \"Implicit Intents\",        \"Explicit Intents\",        \"Intent Filters\",        \"Fragments\",        \"Navigation Components\"      ],      \"animations\": [        \"View Animations\",        \"Property Animations\"      ],      \"modern_ui\": [        \"Jetpack Compose\"      ]    },    \"asynchronism\": [      \"Coroutines\",      \"RxJava\",      \"RxKotlin\"    ],    \"architecture_and_design_patterns\": [      \"MVVM (Model-View-ViewModel)\",      \"MVP (Model-View-Presenter)\",      \"MVC (Model-View-Controller)\",      \"MVI (Model-View-Intent)\",      \"Repository Pattern\",      \"Builder Pattern\",      \"Observer Pattern\",      \"Factory Pattern\"    ],    \"dependency_injection\": [      \"Dagger\",      \"Hilt\",      \"Koin\",      \"Kodein\"    ],    \"storage_and_database\": [      \"Shared Preferences\",      \"DataStore\",      \"Room Database\",      \"File System\"    ],    \"networking\": [      \"Retrofit\",      \"OkHttp\",      \"Apollo-Android\"    ],    \"common_google_services\": [      \"Firebase (Authentication, Cloud Firestore, Realtime Database, Cloud Messaging, Crashlytics, Remote Config)\",      \"Google AdMob\",      \"Google Play Services (Maps, Location, etc.)\"    ],    \"testing_and_quality_assurance\": [      \"Espresso\",      \"JUnit\",      \"Linting (Ktlint, Detekt, Android Lint)\",      \"Debugging Tools (Timber, LeakCanary, Chucker, Jetpack Benchmark)\"    ],    \"distribution\": [      \"Google Play Store\",      \"Firebase App Distribution\",      \"Signing and Managing APKs\"    ],    \"continuous_integration_and_delivery\": [      \"GitHub Actions\",      \"GitLab CI/CD\",      \"Bitbucket Pipelines\"    ],    \"other_tools_and_technologies\": [      \"WorkManager for Background Tasks\",      \"Firebase Distribution for Beta Testing\",      \"Jetpack Libraries (LiveData, ViewModel, Room, Paging, etc.)\"    ]  }}\n\nFrom this JSON, create a new json for the role into 3 divisions as required, preferred and desired skills. The structure of the new json will be that at first it would contain the role name. then in each of the 3 skill section, there will be two keys. first key will be the \"skill name\" with the value as name of the skill and second key would be the \"category\" with the value as name of the category",
#   "output: ",
# ]

# response = model.generate_content(prompt_parts)
# print(response.text)