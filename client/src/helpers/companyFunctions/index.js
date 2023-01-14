import { fileUpload } from "../fileUpload";

export const companyHandlerData = async (values) => {
  const formData = new FormData();
  let pdfUrl;

  if (typeof values.company_profile !== "string") {
    formData.append("file", values.company_profile);
    pdfUrl = await fileUpload(formData);
    formData.delete("file");
  } else {
    pdfUrl = values.company_profile;
  }

  let tempCompanyImage = [];

  for (let i = 0; i < values.company_images.length; i++) {
    if (typeof values.company_images[i] !== "string") {
      formData.append("file", values.company_images[i]);
      let temp = await fileUpload(formData);
      if (temp) {
        tempCompanyImage.push(temp);
      }
      formData.delete("file");
    } else {
      tempCompanyImage.push(values.company_images[i]);
    }
  }

  let tempWorkImage = [];

  for (let i = 0; i < values.our_works.length; i++) {
    if (typeof values.our_works[i] !== "string") {
      formData.append("file", values.our_works[i]);
      let temp = await fileUpload(formData);
      if (temp) {
        tempWorkImage.push(temp);
      }
      formData.delete("file");
    } else {
      tempWorkImage.push(values.our_works[i]);
    }
  }

  let tempAward = [...values.company_awards];

  for (let i = 0; i < tempAward.length; i++) {
    if (typeof tempAward[i].image !== "string") {
      formData.append("file", tempAward[i].image);
      let temp = await fileUpload(formData);
      tempAward[i].image = temp;
      formData.delete("file");
      console.log('-------')
    }
    tempAward[i].title = tempAward[i].title.trim();
    tempAward[i].description = tempAward[i].description.trim();
  }

  let tempTestimonials = [...values.testimonials];

  for (let i = 0; i < tempTestimonials.length; i++) {
    if (typeof tempTestimonials[i].image !== "string") {
      formData.append("file", tempTestimonials[i].image);
      let temp = await fileUpload(formData);
      tempTestimonials[i].image = temp;
      formData.delete("file");
    }
    tempTestimonials[i].title = tempTestimonials[i].title.trim();
    tempTestimonials[i].description = tempTestimonials[i].description.trim();
  }

  let tempCsr = [...values.csr];

  for (let i = 0; i < tempCsr.length; i++) {
    if (typeof tempCsr[i].image !== "string") {
      formData.append("file", tempCsr[i].image);
      let temp = await fileUpload(formData);
      tempCsr[i].image = temp;
      formData.delete("file");
    }
    tempCsr[i].title = tempCsr[i].title.trim();
  }
  const data = {
    company_history: values.company_history.trim(),
    company_video: values.company_video,
    company_images: tempCompanyImage,
    our_works: tempWorkImage,
    csr: { description: values.csr_description.trim(), csr_data: tempCsr },
    company_profile: pdfUrl,
    awards: tempAward,
    testimonials: tempTestimonials,
    facts: {
      year_of_experience: values.year_of_experience.trim(),
      lakh_of_constructed_space: values.lakh_of_constructed_space.trim(),
      landmarks: values.landmarks.trim(),
      commercial_unit: values.commercial_unit.trim(),
      happy_customers: values.happy_customers.trim(),
    },
    address: {
      address_one: values.address_one.trim(),
      address_two: values.address_two.trim(),
      address_lat: values.address_lat.trim(),
      address_long: values.address_long.trim(),
      email: values.email.trim(),
      support_whatsapp: values.support_whatsapp.trim(),
      support_call: values.support_call.trim(),
    },
    follow_me: {
      facebook_url: values.facebook_url.trim(),
      twitter_url: values.twitter_url.trim(),
      youtube_url: values.youtube_url.trim(),
      instagram_url: values.instagram_url.trim(),
    },
  };

  return data;
};

export const getInitialCompanyState = (
  companyState,
  initialCompanyAwardPreview,
  initialTestimonialsPreview,
  initialCsrPreview,
  initialCompanyImagePreview,
  initialOurWorkPreview,
  initialCompanyFacts,
  initialCompanyAddress,
  initialCompanyFollow,
  initialCompanyPdfPreview
) => {
  return {
    pending: false,
    company_history: companyState?.company_history
      ? companyState.company_history
      : "",
    company_video: companyState?.company_video
      ? companyState.company_video
      : "",
    company_profile: companyState?.company_profile
      ? companyState?.company_profile
      : "",
    company_profile_preview: companyState?.company_profile
      ? initialCompanyPdfPreview
      : [],
    company_images: companyState?.company_images
      ? JSON.parse(companyState.company_images)
      : [],
    company_images_preview: companyState?.company_images
      ? initialCompanyImagePreview
      : [],
    company_images_error: "",
    our_works: companyState?.our_works
      ? JSON.parse(companyState.our_works)
      : [],
    our_works_preview: companyState?.our_works ? initialOurWorkPreview : [],
    our_works_error: "",
    company_awards: companyState?.awards
      ? JSON.parse(companyState.awards)
      : [
          {
            title: "",
            description: "",
            image: "",
          },
        ],
    company_awards_preview: companyState?.awards
      ? initialCompanyAwardPreview
      : [],
    company_awards_error: [],
    testimonials: companyState?.testimonials
      ? JSON.parse(companyState.testimonials)
      : [
          {
            title: "",
            description: "",
            image: "",
          },
        ],
    testimonials_preview: companyState?.testimonials
      ? initialTestimonialsPreview
      : [],
    testimonials_error: [],
    csr_description: companyState?.csr
      ? JSON.parse(companyState.csr).description
      : "",
    csr: companyState?.csr
      ? JSON.parse(companyState.csr).csr_data
      : [
          {
            title: "",
            image: "",
          },
        ],
    csr_preview: companyState?.csr ? initialCsrPreview : [],
    csr_error: [],
    year_of_experience: companyState?.facts
      ? initialCompanyFacts.year_of_experience
      : "",
    lakh_of_constructed_space: companyState?.facts
      ? initialCompanyFacts.lakh_of_constructed_space
      : "",
    landmarks: companyState?.facts ? initialCompanyFacts.landmarks : "",
    commercial_unit: companyState?.facts
      ? initialCompanyFacts.commercial_unit
      : "",
    happy_customers: companyState?.facts
      ? initialCompanyFacts.happy_customers
      : "",

    address_one: companyState?.address ? initialCompanyAddress.address_one : "",
    address_two: companyState?.address ? initialCompanyAddress.address_two : "",
    address_lat: companyState?.address ? initialCompanyAddress.address_lat : "",
    address_long: companyState?.address
      ? initialCompanyAddress.address_long
      : "",
    email: companyState?.address ? initialCompanyAddress.email : "",
    support_whatsapp: companyState?.address
      ? initialCompanyAddress.support_whatsapp
      : "",
    support_call: companyState?.address
      ? initialCompanyAddress.support_call
      : "",
    facebook_url: companyState?.follow_me
      ? initialCompanyFollow.facebook_url
      : "",
    twitter_url: companyState?.follow_me
      ? initialCompanyFollow.twitter_url
      : "",
    youtube_url: companyState?.follow_me
      ? initialCompanyFollow.youtube_url
      : "",
    instagram_url: companyState?.follow_me
      ? initialCompanyFollow.instagram_url
      : "",
  };
};

export const companyValidate = (
  temp,
  fieldValues,
  values,
  setValues,
  setErrors
) => {
  var expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  var regex = new RegExp(expression);

  var re =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  var reg = new RegExp(re);

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var mailReg = new RegExp(mailformat);

  if ("company_history" in fieldValues) {
    temp.company_history = fieldValues.company_history
      ? ""
      : "History is required !";
  }
  if ("company_profile" in fieldValues) {
    temp.company_profile = "";
    if (
      fieldValues?.company_profile?.name &&
      !fieldValues?.company_profile?.name?.match(/.(pdf)$/i)
    ) {
      temp.company_profile = "Invalid Documents";
      setValues({
        ...values,
        company_profile_preview: "",
        company_profile: "",
      });
    }
  }
  if ("company_video" in fieldValues) {
    temp.company_video =
      fieldValues.company_video.length > 0 &&
      fieldValues.company_video.match(reg)
        ? ""
        : "Enter valid video url !";
  }
  if ("year_of_experience" in fieldValues) {
    temp.year_of_experience = fieldValues.year_of_experience
      ? ""
      : "Year is required !";
  }
  if ("lakh_of_constructed_space" in fieldValues) {
    temp.lakh_of_constructed_space = fieldValues.lakh_of_constructed_space
      ? ""
      : "Space is required !";
  }
  if ("landmarks" in fieldValues) {
    temp.landmarks = fieldValues.landmarks ? "" : "Landmark is required !";
  }
  if ("commercial_unit" in fieldValues) {
    temp.commercial_unit = fieldValues.commercial_unit
      ? ""
      : "Commercial is required !";
  }
  if ("happy_customers" in fieldValues) {
    temp.happy_customers = fieldValues.happy_customers
      ? ""
      : "Customer is required !";
  }
  if ("email" in fieldValues) {
    temp.email = fieldValues.email.match(mailReg) ? "" : "Email is required !";
  }
  if ("support_whatsapp" in fieldValues) {
    if (!fieldValues.support_whatsapp) {
      temp.support_whatsapp = "Support whatsapp number is required !";
    } else {
      temp.support_whatsapp =
        fieldValues.support_whatsapp.length === 10
          ? ""
          : "Support whatsapp number is not valid !";
    }
  }
  if ("support_call" in fieldValues) {
    if (!fieldValues.support_call) {
      temp.support_call = "Support phone number is required !";
    } else {
      temp.support_call =
        fieldValues.support_call.length === 10
          ? ""
          : "Support phone number is not valid !";
    }
  }
  if ("facebook_url" in fieldValues) {
    temp.facebook_url =
      fieldValues.facebook_url.length > 0 &&
      !fieldValues.facebook_url.match(regex)
        ? "Enter valid facebook url"
        : "";
  }
  if ("twitter_url" in fieldValues) {
    temp.twitter_url =
      fieldValues.twitter_url.length > 0 &&
      !fieldValues.twitter_url.match(regex)
        ? "Enter valid twitter url"
        : "";
  }
  if ("youtube_url" in fieldValues) {
    temp.youtube_url =
      fieldValues.youtube_url.length > 0 &&
      !fieldValues.youtube_url.match(regex)
        ? "Enter valid youtube url"
        : "";
  }
  if ("instagram_url" in fieldValues) {
    temp.instagram_url =
      fieldValues.instagram_url.length > 0 &&
      !fieldValues.instagram_url.match(regex)
        ? "Enter valid instagram url"
        : "";
  }
  setErrors({
    ...temp,
  });
  if (fieldValues === values) {
    return Object.values(temp).every((x) => x === "");
  }
};
