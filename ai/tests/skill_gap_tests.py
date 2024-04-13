import requests
import unittest
 
class TestSkillGapAnalysisAPI(unittest.TestCase):
    def test_skill_gap_endpoint(self):
        response = requests.post('http://localhost:5000/api/skill_gap', json={'resume': 'resume text', 'job_description': 'job description text'})
        self.assertEqual(response.status_code, 200)
        self.assertIn('skill_gap', response.json())
        self.assertTrue(isinstance(response.json()['skill_gap'], list))
 
if __name__ == '__main__':
    unittest.main()