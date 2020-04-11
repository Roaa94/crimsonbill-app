import React from 'react';
import {AvatarContainer, AvatarImageWrapper, AvatarWrapper, LoaderWrapper} from './DrawerAvatar.styles';
import AvatarPlaceholder from '../../../assets/images/avatar-placeholder.png';
import {selectCurrentUser} from "../../../redux/user/user.selectors";
import {connect} from 'react-redux';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import {storageRef, updateUserDocumentAvatar} from '../../../firebase/firebase.utils';
import {updateUserAvatar} from "../../../redux/user/user.actions";
import {ReactComponent as Loader} from '../../../assets/svg/loader.svg';

class DrawerAvatar extends React.Component {

    state = {
        loadingAvatar: false,
    };

    handleClick = () => {
        this.refs.fileUploader.click();
    };

    fileSelectionHandler = event => {
        const {updateUserAvatar} = this.props;

        event.persist();
        let file = event.target.files[0];
        let {currentUser} = this.props;
        console.log(file);
        if (file) {
            let fileName = event.target.files[0].name;
            let avatarRef = storageRef.child(fileName);
            this.setState({loadingAvatar: true});

            avatarRef.put(file).then(() => {
                avatarRef.getDownloadURL().then(url => {
                    updateUserAvatar(url);
                    updateUserDocumentAvatar(currentUser, url).then(() => {
                        this.setState({loadingAvatar: false});
                    }).catch(error => console.log(error.message));
                }).catch(error => console.log(error.message));
            }).catch(error => console.log(error.message));
        }
    };

    render() {
        let {currentUser} = this.props;
        let {loadingAvatar} = this.state;

        return (
            <AvatarWrapper>
                <AvatarContainer onClick={this.handleClick}>
                    {
                        loadingAvatar ? (
                            <LoaderWrapper>
                                <Loader/>
                            </LoaderWrapper>
                        ) : (
                            <AvatarImageWrapper>
                                <img src={currentUser.avatarUrl ? currentUser.avatarUrl : AvatarPlaceholder}
                                     alt=""/>
                            </AvatarImageWrapper>
                        )
                    }
                    <div className='edit-icon'>
                        <EditRoundedIcon/>
                    </div>
                </AvatarContainer>

                <input type="file" ref="fileUploader" onChange={this.fileSelectionHandler} style={{display: 'none'}}/>
                <h2>{currentUser.displayName}</h2>
            </AvatarWrapper>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({
    updateUserAvatar: avatarUrl => dispatch(updateUserAvatar(avatarUrl))
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerAvatar);