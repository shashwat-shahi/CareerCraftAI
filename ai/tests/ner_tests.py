import unittest

from resume_entity_extraction import NamedEntityRecognizer
 
class TestNamedEntityRecognizer(unittest.TestCase):
 
    def setUp(self):

        self.ner = NamedEntityRecognizer()
 
    def test_ner_identifies_skills_correctly(self):

        sample_text = "Experienced in Python and machine learning"

        expected_skills = ['Python', 'machine learning']

        identified_skills = self.ner.extract_skills(sample_text)

        self.assertEqual(set(expected_skills), set(identified_skills))
 
    def test_ner_handles_no_skills(self):

        sample_text = "No technical skills mentioned here."

        identified_skills = self.ner.extract_skills(sample_text)

        self.assertEqual(0, len(identified_skills))
 
if __name__ == '__main__':

    unittest.main()
