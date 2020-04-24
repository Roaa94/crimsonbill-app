import React from 'react';
import AvatarPlaceholder from '../../../assets/images/avatar-placeholder.png';
import {selectUser} from "../../../redux/user/user.selectors";
import {connect} from 'react-redux';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import {storageRef, updateUserDocumentAvatar} from '../../../firebase/firebase.utils';
import {updateUserAvatar} from "../../../redux/user/user.actions";
import {toggleLoading} from "../../../redux/loading.reducer";
import WithLoader from "../../HOC/WithLoader";
import {
    AvatarWrapper,
    AvatarContainer,
    AvatarImageWrapper,
    LoaderWrapper,
} from './DrawerAvatar.styles';

const AvatarImageWrapperWithLoader = WithLoader(AvatarImageWrapper, LoaderWrapper)

class DrawerAvatar extends React.Component {

    handleClick = () => {
        this.refs.fileUploader.click();
    };

    fileSelectionHandler = event => {
        const {updateUserAvatar, toggleLoading} = this.props;

        event.persist();
        let file = event.target.files[0];
        let {user} = this.props;
        console.log(file);
        if (file) {
            let fileName = event.target.files[0].name;
            let avatarRef = storageRef.child(fileName);

            toggleLoading(true);
            avatarRef.put(file).then(() => {

                avatarRef.getDownloadURL().then(url => {

                    updateUserAvatar(url);
                    updateUserDocumentAvatar(user, url).then(() => {
                    }).catch(error => console.log(error.message));
                    toggleLoading(false);

                }).catch(error => console.log(error.message));

            }).catch(error => console.log(error.message));
        }
    };

    render() {
        let {user} = this.props;

        return (
            <AvatarWrapper>
                <AvatarContainer onClick={this.handleClick}>
                    <AvatarImageWrapperWithLoader>
                        <img src={user.avatarUrl ? user.avatarUrl : AvatarPlaceholder}
                             alt=""/>
                        <div className='edit-icon'>
                            <EditRoundedIcon/>
                        </div>
                    </AvatarImageWrapperWithLoader>
                </AvatarContainer>

                <input type="file" ref="fileUploader" onChange={this.fileSelectionHandler} style={{display: 'none'}}/>
                <h2>{user.displayName}</h2>
            </AvatarWrapper>
        );
    }
}

const mapStateToProps = state => ({
    user: selectUser(state),
});

const mapDispatchToProps = dispatch => ({
    updateUserAvatar: avatarUrl => dispatch(updateUserAvatar(avatarUrl)),
    toggleLoading: value => dispatch(toggleLoading(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerAvatar);