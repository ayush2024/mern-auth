import Dashboard from '../Dashboard/Dashboard.js'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

test('should render dashboard component', () => {
    
    render(
        <Dashboard />
    );

    const dashElement = screen.getByTestId('dash-test');
    expect(dashElement).toBeInTheDocument();
    expect(dashElement).toContainHTML('</h1>');
});

test('match snapsot', () => {

    const tree = renderer.create(
        <Dashboard />
    ).toJSON();

    console.log(tree);
    expect(tree).toMatchSnapshot();
});