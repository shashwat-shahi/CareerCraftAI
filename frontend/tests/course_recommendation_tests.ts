import React from 'react';
import { mount } from 'enzyme';
import CourseRecommendation from './CourseRecommendation';
 
describe('CourseRecommendation', () => {
  const suggestedCourses = [
    { title: 'Mastering React', tag: 'React' },
    { title: 'Advanced Node Techniques', tag: 'Node.js' }
  ];
 
  it('renders a list of courses tailored to the user\'s skill gaps', () => {
    const component = mount(<CourseRecommendation courses={suggestedCourses} />);
    expect(component.find('.course-list').children()).toHaveLength(suggestedCourses.length);
    suggestedCourses.forEach((course) => {
      expect(component.text()).toMatch(course.title);
    });
  });
});