import React, { ReactNode, useEffect } from 'react';
import InputControl from '../input-control/InputControl';
import {
    SupportedLanguages,
    SupportedLanguagesEnum,
} from '@/app/i18n/settings';
import { useTranslation } from '@/app/i18n/client';
import clsx from 'clsx';
import styles from '@/app/shared/file-uploader/FileUploader.module.css';
import { UseFormRegisterReturn } from 'react-hook-form';
import Image from 'next/image';

interface FileUploaderProps {
    lng: SupportedLanguages;
    variant: 'avatar' | 'default';
    register?: UseFormRegisterReturn;
    isError?: boolean;
    fileInputId?: string;
    uploadedFile: File | null;
}

const FileUploader = ({
    lng,
    variant,
    register,
    isError,
    uploadedFile,
    fileInputId,
}: FileUploaderProps) => {
    useEffect(() => {
        console.log('uploadddding: ', uploadedFile);
    });

    switch (variant) {
        case 'avatar':
            return (
                <InputControl border="dotted" lng={lng}>
                    <label className={styles.avatar_label}>
                        <div className={styles.avatar_picture_container}>
                            {uploadedFile ? (
                                <img
                                    src={URL.createObjectURL(uploadedFile)}
                                    alt="avatar"
                                />
                            ) : (
                                <img
                                    src="/assets/icons/avatar_profile.png"
                                    alt="avatar placeholder"
                                />
                            )}
                        </div>
                        <span className={styles.avatar_name}>{uploadedFile?.name}</span>
                        <input
                            id={fileInputId}
                            type="file"
                            {...register}
                            className={clsx(
                                styles.file_control,
                                'visually-hidden',
                                { [styles.error]: isError }
                            )}
                        />
                    </label>
                </InputControl>
            );
    }
};

export default FileUploader;
