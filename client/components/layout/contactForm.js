import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { theme } from '../../styles/theme';

// import sendEmail from "../../store/actions/email";
import sendEmail from '../../store/actions/email';
import {
  EMAIL_LOADING,
  EMAIL_INITIAL,
  EMAIL_ALL_FILLIN,
} from '../../store/types';

const useStyles = makeStyles({
  root: {
    width: 440,
    margin: '80px auto 0',
    padding: '12px',
    [theme.breakpoints.down('xs')]: {
      width: 300,
      margin: '45px auto 30px',
    },
  },
  textField: {
    width: '100%',
    margin: '12px 0',
    borderColor: 'yellow',
  },
  select: {
    width: '100%',
    margin: '12px 0',
  },
  inputLabel: {
    margin: '-4px 16px 0',
  },
  button: {
    margin: '12px 0',
    backgroundColor: '#2caeba',
    color: '#bff8fd',
    padding: '8px 18px',
    boxShadow: '0 1px 3px rgb(0 0 0 / 20%)',
    transition: 'all 0.3s linear',
    fontWeight: 700,
    letterSpacing: 2,
    width: '100%',
    '&:hover': {
      backgroundColor: '#88ebf2',
      color: '#102a42',
    },
  },
  button_disabled: {
    margin: '12px 0',
    backgroundColor: '#e6e6e6',
    color: '#bff8fd',
    padding: '8px 18px',
    boxShadow: '0 1px 3px rgb(0 0 0 / 20%)',
    transition: 'all 0.3s linear',
    fontWeight: 700,
    letterSpacing: 2,
    width: '100%',
  },
});

const ContactForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const email = useSelector((state) => state.email);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    question: '',
    request: '',
  });

  useEffect(() => {
    if (
      formData.name !== '' &&
      formData.contact !== '' &&
      formData.question !== ''
    ) {
      dispatch({
        type: EMAIL_ALL_FILLIN,
        payload: formData,
      });
    } else {
      dispatch({
        type: EMAIL_INITIAL,
      });
    }
  }, [formData, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: EMAIL_LOADING,
      payload: formData,
    });
    sendEmail(dispatch, formData, router);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="outlined-basic"
              label="稱呼"
              placeholder="請留下 姓+先生/小姐 即可"
              variant="outlined"
              name="name"
              className={classes.textField}
              onChange={handleChange}
              helperText="這樣會讓我們比較知道怎麼稱呼你唷。"
              disabled={email.formDisabled}
            />
            <TextField
              required
              id="outlined-basic"
              label="聯絡方式"
              placeholder="請留下您的 line ID/ Email"
              variant="outlined"
              name="contact"
              className={classes.textField}
              onChange={handleChange}
              disabled={email.formDisabled}
            />
            <FormControl
              required
              className={classes.select}
              disabled={email.formDisabled}
            >
              <InputLabel className={classes.inputLabel}>
                想詢問的問題
              </InputLabel>
              <Select
                value={formData.question}
                onChange={handleChange}
                variant="outlined"
                name="question"
                label="想詢問的問題"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="形象網站相關問題">形象網站相關問題</MenuItem>
                <MenuItem value="電商平台相關問題">電商平台相關問題</MenuItem>
                <MenuItem value="設計相關問題">設計相關問題</MenuItem>
                <MenuItem value="其他">其他(可於下面欄位簡單說明)</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="outlined-multiline-static"
              label="我想要說："
              placeholder="請留下您想說的話或是問題。我們會儘速與您聯絡。"
              variant="outlined"
              name="request"
              multiline
              rows={5}
              className={classes.textField}
              onChange={handleChange}
              // helperText=""
              disabled={email.formDisabled}
            />
          </form>
          <Button
            text="送出"
            type="submit"
            onClick={onSubmit}
            disabled={email.btnDisabled}
            className={
              email.btnDisabled ? classes.button_disabled : classes.button
            }
            style={{ backgroundColor: email.btnColor }}
          >
            {email.btnText}
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ContactForm;
