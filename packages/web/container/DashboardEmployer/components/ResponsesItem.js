import { Avatar, Button, Modal } from 'antd'
import PropTypes from 'prop-types'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { UserOutlined, StepForwardOutlined, CloseCircleOutlined, DownSquareOutlined } from '@ant-design/icons'
import { useHover } from 'hooks/useHover'
import { CONFIG } from '../../../constants'

const CHANGE_STATUS = gql`
  mutation changeStatus($status: CandidateStatus!, $candidateId: ID!) {
    changeStatus(status: $status, candidateId: $candidateId) {
      _id
    }
  }
`

const { ACCEPTED, INTERVIEW, OFFER, REJECT, RESERVE, RESPONSES } = CONFIG.JOB.APPLY_STATUS

const FAKE_INDEX_STATUS = {
  0: RESPONSES,
  1: INTERVIEW,
  2: OFFER,
  3: ACCEPTED,
}

const ResponsesItem = ({ item }) => {
  const router = useRouter()
  const [hoverRef, isHovered] = useHover()
  const [submitChangeStatus] = useMutation(CHANGE_STATUS, {
    onCompleted() {
      router.reload()
    },
  })

  const handleNextStep = (status) => {
    const statusNo = Object.keys(FAKE_INDEX_STATUS).find((key) => FAKE_INDEX_STATUS[key] === status)
    if (statusNo) {
      Modal.confirm({
        title: 'Confirm',
        content: `Do you want to next step?`,
        okText: 'OK',
        onOk: async () => {
          await submitChangeStatus({
            variables: {
              candidateId: item?._id,
              status: FAKE_INDEX_STATUS[Number(statusNo) + 1],
            },
          })
        },
        cancelText: 'Cancel',
      })
    }
  }

  const handleChangeCandidate = (status) => {
    Modal.confirm({
      title: 'Confirm',
      content: `Do you want to ${status} candidate?`,
      okText: 'OK',
      onOk: async () => {
        await submitChangeStatus({
          variables: {
            candidateId: item?._id,
            status,
          },
        })
      },
      cancelText: 'Cancel',
    })
  }

  const isHiddenButton = item?.status !== REJECT && item?.status !== ACCEPTED && item?.status !== RESERVE

  return (
    <div className="flex justify-between w-full" ref={hoverRef} style={{ minHeight: '150px' }}>
      <div className="w-full flex">
        <div className="flex-none mr-4">
          <Avatar
            size={48}
            src={item?.status !== RESPONSES ? item?.candidate?.avatar : ''}
            className="flex justify-center items-center"
            icon={<UserOutlined />}
          />
        </div>
        <div className="flex flex-col w-full">
          <h3 className={`font-bold text-base  ${isHovered ? 'text-primary' : ''}`}>
            {item?.status !== RESPONSES ? `${item?.candidate?.firstName} ${item?.candidate?.lastName}` : 'User Applied'}
          </h3>
          {item?.status !== RESPONSES && (
            <div>
              <p className="font-semibold text-gray-700">{item?.job.title}</p>
              <div className="flex items-center text-gray-600">
                <div className="h-4 w-4">
                  <img src="/img/icons/flagmap.png" alt="" />
                </div>
                <p className="ml-2  text-gray-600">{item?.candidate?.address || 'Ho Chi Minh City'}</p>
              </div>
              <div className=" text-gray-600">{`Reputation : ${item?.candidate?.reputation || 0}`}</div>
            </div>
          )}
        </div>
      </div>

      {isHiddenButton && (
        <div style={{ width: '200px' }}>
          <Button
            icon={<StepForwardOutlined />}
            ghost
            type="primary"
            className="w-32 flex items-center cursor-pointer"
            onClick={() => handleNextStep(item?.status)}
          >
            Next Step
          </Button>

          <Button
            icon={<CloseCircleOutlined />}
            ghost
            type="primary"
            className="w-32 mt-2 flex items-center cursor-pointer"
            onClick={() => handleChangeCandidate(REJECT)}
          >
            Reject
          </Button>
          <Button
            icon={<DownSquareOutlined />}
            ghost
            type="primary"
            className="w-32 mt-2 flex items-center cursor-pointer"
            onClick={() => handleChangeCandidate(RESERVE)}
          >
            Reserve List
          </Button>
        </div>
      )}
    </div>
  )
}

ResponsesItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
}
export default ResponsesItem
