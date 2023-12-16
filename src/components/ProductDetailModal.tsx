/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
    DButton,
    DModal,
    DModalBody,
    DModalHeader,
    ModalProps,
} from '@dynamic-framework/ui-react'
import { useTranslation } from 'react-i18next'

export default function ProductDetailModal({
    payload: { content },
    closeModal,
}: ModalProps) {
    const { t } = useTranslation()

    return (
        <DModal
            className="activity-detail-modal d-block"
            name="modal"
            isCentered
        >
            <DModalHeader onClose={() => closeModal()} showCloseButton>
                <h5 className="fw-bold flex-grow-1 activity-name text-wrap">
                    {content.name}
                </h5>
            </DModalHeader>
            <DModalBody>
                <div className="d-flex flex-column gap-4">
                    <div className="bg-light rounded-1 p-3">
                        <div className="d-flex flex-column gap-1">
                            <div className="d-flex align-items-center gap-1">
                                {content.description}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <DButton
                            text={t('modal.actions.accept')}
                            onClick={() => closeModal()}
                            isPill
                        />
                    </div>
                </div>
            </DModalBody>
        </DModal>
    )
}
