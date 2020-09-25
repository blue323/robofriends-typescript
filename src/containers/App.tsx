import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

export interface IRobot {
    name: string;
    id: number;
    email: string;
}

interface IAppProps {
}

interface IAppState {
    robots: Array<IRobot>;
    searchfield: string;
}

class App extends Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props)
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(): void {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots: users }));
    }

    onSearchChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
        this.setState({searchfield: event.currentTarget.value});
    }

    render(): JSX.Element {
        const { robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase())
        })
        return !robots.length ?
            <h1 className='tc'>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox  searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }

export default App;