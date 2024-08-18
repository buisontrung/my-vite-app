import { GridColDef } from '@mui/x-data-grid';
import './Add.scss';
import axios from 'axios';
import { useState } from 'react';

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
};

const Add = (props: Props) => {
  const [formData, setFormData] = useState<{ [key: string]: string | number | File }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.type === 'file' ? (e.target.files ? e.target.files[0] : null) : e.target.value;
    setFormData(prevData => ({
      ...prevData,
      [field]: value ?? '' // Đảm bảo không có giá trị undefined
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (value instanceof File) {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.append(key, value.toString());
        }
      }
      const response = await axios.post(props.url, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Form submitted successfully', response.data);
      props.setOpen(false);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <div className="add">
      <div className="modal1">
        <span className="close" onClick={() => props.setOpen(false)}>X</span>
        <h1>Thêm mới {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns.filter(item => item.field !== 'id' && item.field !== 'imageUrl').map(column => (
            <div className="item" key={column.field}>
              <label>{column.headerName}</label>
              {column.field === 'imageFile' ? (
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleChange(e, column.field)}
                />
              ) : (
                <input
                  type={column.type === 'string' ? 'text' : 'number'}
                  placeholder={column.headerName}
                  onChange={(e) => handleChange(e, column.field)}
                />
              )}
            </div>
          ))}
          <button type="submit">Thêm</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
