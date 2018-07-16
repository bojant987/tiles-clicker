import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';

import ALL_LEVELS from '../../Redux/constants/levels';
import chooseLevel from '../../Redux/actions/chooseLevel';

class ChooseLevel extends Component {
	static propTypes = {
		closeChooseLevelModal: PropTypes.func.isRequired,
		choose: PropTypes.func.isRequired,
		progress: PropTypes.number.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			selectedLevel: 1,
		};
	}

	handleLevelChange = level => {
		this.setState({ selectedLevel: level.value });
	};

	play = () => {
		const { choose, closeChooseLevelModal } = this.props;
		const { selectedLevel } = this.state;

		choose(selectedLevel);
		closeChooseLevelModal();
	};

	render() {
		const { progress } = this.props;
		const { selectedLevel } = this.state;
		const viableLevels = ALL_LEVELS.filter(level => level.value <= progress);

		return (
			<div className="ChooseLevel">
				<Select
					name="selected-level"
					value={selectedLevel}
					onChange={this.handleLevelChange}
					options={viableLevels}
					clearable={false}
				/>
				<button type="button" className="Button h-marginT--lg h-centerBlock" onClick={this.play}>
					Play
				</button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	progress: state.activePlayer.progress,
});

const mapDispatchToProps = dispatch => ({
	choose: level => dispatch(chooseLevel(level)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChooseLevel);