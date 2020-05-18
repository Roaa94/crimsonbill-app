import React from 'react';
import AvatarPlaceholder from '../../../assets/images/avatar-placeholder.png';
import {selectUserData} from "../../../redux/user/user.selectors";
import {connect} from 'react-redux';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import {storageRef} from '../../../firebase/firebase.utils';
import WithLoader from "../../HOC/WithLoader";
import {
    AvatarWrapper,
    AvatarContainer,
    AvatarImageWrapper,
    LoaderWrapper,
} from './DrawerAvatar.styles';
import {updateUserDocumentAvatar} from "../../../firebase/user.firebase-utils";

const AvatarImageWrapperWithLoader = WithLoader(AvatarImageWrapper, LoaderWrapper)

class DrawerAvatar extends React.Component {

    state = {
        loadingAvatar: false,
    };

    handleClick = () => {
        this.refs.fileUploader.click();
    };

    fileSelectionHandler = event => {

        event.persist();
        let file = event.target.files[0];
        let {user} = this.props;
        if (file) {
            let fileName = event.target.files[0].name;
            let avatarRef = storageRef.child(fileName);

            this.setState({loadingAvatar: true});
            avatarRef.put(file).then(() => {

                avatarRef.getDownloadURL().then(async url => {

                    await updateUserDocumentAvatar(user, url);
                    this.setState({loadingAvatar: false});

                });

            }).catch(error => console.log(error.message));
        }
    };

    render() {
        let {user} = this.props;
        let {loadingAvatar} = this.state;

        return (
            <AvatarWrapper>
                <AvatarContainer onClick={this.handleClick}>
                    <AvatarImageWrapperWithLoader loading={loadingAvatar}>
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
    user: selectUserData(state),
});

export default connect(mapStateToProps)(DrawerAvatar);