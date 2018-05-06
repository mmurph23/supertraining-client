import React, { Component } from "react";
import { Auth } from 'aws-amplify';
import { PageHeader, ListGroup, ListGroupItem, Grid, Row, Col } from "react-bootstrap";
import CreateChallenge from '../CreateChallenge'
import "./Home.css";
import api from '../../api';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      childAccounts: [],
      caboodles: [],
    };
  }

  async componentDidMount() {
    let userData = await api.getUser(this.props.user);
    if (!userData.Item) {
      console.log('no user data')
      api.createUser(this.props.user);
    } else {
      console.log('user data')
      let info = userData;
      console.log(userData);
      console.log(info);
      // this.setState({childAccounts: info.Item.childAccounts.L, caboodles: info.Item.caboodles.L})
    }
    // let newChild = await api.createChildUser('test@test.com','Sarah');
  }

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);

    this.props.history.push("/");
  }


  render() {

    // let cList = [this.state.caboodles.map(caboodle => {
    //   let c = JSON.parse(caboodle.S);
    //   console.log(c.img + ' ' + c.name + ' ' + c.id);
    //   return({id:c.id, name:c.name, img: c.img})
    // })
    // ];
    // console.log('cList')
    // console.log(cList)

    return (
      <div className="Home" style={{ width: '100vw' }}>
        <Row>
          <Col md={3} >
            <CreateChallenge />
          </Col>
          <Col md={9} >

          </Col>
        </Row>

        {/* <SubHeader links={[{link:'caboodles',title:'CABOODLES'},
                          {link:'social',title:'SOCIAL'},
                          {link:'activities',title:'THINGS TO DO'},
                          {link:'calendar',title:'CALENDAR'},
                          {link:'blog',title:'BLOG'},
                         ]} />
      
        <Metrics metrics={[{amount:1,title:'Kids'},
                           {amount:0,title:'Caboodle\'s'},
                           {amount:0,title:'Websites'},
                           {amount:0,title:'Following'},
                           {amount:0,title:'Followers'},
                          ]} />
        <JuniorAccounts accounts={[{name:'Sarah'},]} />
        <h1 style={{marginTop:'40px',marginBottom:'80px',fontWeight:'bold',fontSize:'48px',textAlign:'center',color:'#0972d6'}}>Caboodles You May Enjoy</h1>

        <CaboodleList caboodles={cList[0]}/> */}

        {/* <CaboodleList caboodles={[{id:1,name:'Firetrucks',img:'https://i.ytimg.com/an_webp/YL_fZIVxLuA/mqdefault_6s.webp?du=3000&sqp=CMCCydYF&rs=AOn4CLAXyRbWm47CoR4wtWi8KL-UhzSBFw'},
                           {id:2,name:'Firetrucks',img:'https://i.ytimg.com/an_webp/YL_fZIVxLuA/mqdefault_6s.webp?du=3000&sqp=CMCCydYF&rs=AOn4CLAXyRbWm47CoR4wtWi8KL-UhzSBFw'},
                           {id:3,name:'Firetrucks',img:'https://i.ytimg.com/an_webp/YL_fZIVxLuA/mqdefault_6s.webp?du=3000&sqp=CMCCydYF&rs=AOn4CLAXyRbWm47CoR4wtWi8KL-UhzSBFw'},
                           {id:4,name:'Firetrucks',img:'https://i.ytimg.com/an_webp/YL_fZIVxLuA/mqdefault_6s.webp?du=3000&sqp=CMCCydYF&rs=AOn4CLAXyRbWm47CoR4wtWi8KL-UhzSBFw'},
                           {id:5,name:'Firetrucks',img:'https://i.ytimg.com/an_webp/YL_fZIVxLuA/mqdefault_6s.webp?du=3000&sqp=CMCCydYF&rs=AOn4CLAXyRbWm47CoR4wtWi8KL-UhzSBFw'},
                          ]}/> */}


      </div>
    );
  }
}


