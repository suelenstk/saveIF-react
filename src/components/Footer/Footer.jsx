import React, {Component} from 'react';
import { Grid } from 'react-bootstrap';

class Footer extends Component {
	render() {
		return (
            <footer className="footer">
                <Grid>
                    <nav className="pull-left">
                        <ul>
                            <li>
                                <a href="">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    Fale conosco
                                </a>
                            </li>
                            
                        </ul>
                    </nav>
                    <p className="copyright pull-right">
                        &copy; {(new Date()).getFullYear()} By <a href="">Equipe SaveIF</a>
                    </p>
                </Grid>
            </footer>
		);
	}
}

export default Footer;
