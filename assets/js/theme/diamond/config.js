var dxAppUrl = "//randembigcommerce.randemgroup.com.au/app-diamond-exchange/application";
var dxSettingVideosUrl = "//s3-ap-southeast-2.amazonaws.com/dxresource/settings-videos";
var globalGst = 10;
var giaId = 1355954554547;

var globalDiamondShapes = {1: "Round", 2: "Princess", 3: "Emerald", 4: "Asscher", 5: "Marquise", 6: "Oval", 7: "Cushion", 8: "Pear", 9: "Heart", 10: "Radiant"};
var globalSettingTypes = {
  "ring": {
    "db_key": "ring_setting",
    "default_type": "solitaire-rings",
    "types": {
      "solitaire-rings": {
        "key": "solitaire",
        "val": "Solitaire",
      },
      "side-stone-rings": {
        "key": "side_stone",
        "val": "Side Diamonds",
      },
      "three-stone-rings": {
        "key": "three_stone",
        "val": "Trilogy",
      },
      "halo-rings": {
        "key": "halo",
        "val": "Halo",
      },
    },
    "banner": {
      "image": "choose-a-setting.jpg",
						"heading1": "BUILD YOUR OWN RING",
      "heading2": "EXPRESS YOURSELF",
      "content": "Follow our simple three-step process and you can create the exact diamond engagement ring you've been dreaming of.",
    }
  },
  "earring": {
    "db_key": "earring_setting",
    "default_type": "solitaire-earrings",
    "types": {
      "solitaire-earrings": {
        "key": "solitaire_earrings",
        "val": "Solitaire",
      },
      "round-halo-earrings": {
        "key": "round_halo",
        "val": "Round Halo",
      },
      "princess-4-prong-earrings": {
        "key": "princess_4_prong",
        "val": "Princess 4 Prong",
      },
      "square-halo-earrings": {
        "key": "square_halo",
        "val": "Square Halo",
      },
      "round-4-prong-earrings": {
        "key": "round_4_prong",
        "val": "Round 4 Prong",
      },
      "3-prong-martini-earrings": {
        "key": "3_prong_martini",
        "val": "3 Prong Martini",
      },
    },
    "banner": {
      "image": "earrings-banner-1400x240.jpg",
						"heading1": "EXHIBIT YOUR FLAIR",
      "heading2": "CREATE YOUR OWN EARRINGS",
      "content": "Get set to dazzle with a beautiful set of diamond earrings designed by you for you."
    }
  },
  "pendant": {
    "db_key": "pendant_setting",
    "default_type": "solitaire-pendants",
    "types": {
      "solitaire-pendants": {
        "key": "solitaire_pendants",
        "val": "Solitaire",
      },
      "3-prong-pendants": {
        "key": "3_prong",
        "val": "3 Prong",
      },
      "4-prong-pendants": {
        "key": "4_prong",
        "val": "4 Prong",
      },
						"round-halo-pendants": {
        "key": "round_halo_pendants",
        "val": "Round Halo",
      },
    },
    "banner": {
      "image": "pendant-banner-1400x240.png",
						"heading1": "EXPRESS YOUR PERSONALITY",
      "heading2": "BUILD YOUR OWN PENDANT",
      "content": "A stunning diamond pendant adds a brilliant touch. Especially one designed with your own flair."
    }
  },
};

// set minimum and maximum value for price in price slider
var globalPriceObj = {'min': 100, 'max': 500000};

// set minimum and maximum value for carat in carat slider
var globalCaratObj = {'min': 0.01, 'max': 10.75};

// set values for colour in colour slider
var globalColourArr = ["D", "E", "F", "G", "H", "I", "J", "K", "N"];

// set values for clarity in clarity slider
var globalClarityArr = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"];

// set values for cut in cut slider
var globalCutArr = ["Ideal", "Excellent", "Very Good", "Good"];

// set and show Polish variables in html
var globalPolishArr = ["Excellent", "Very Good", "Good"];

// set and show Symmetry variables in html
var globalSymmetryArr = ["Excellent", "Very Good", "Good"];

// set and show Fluorescence variables in html
var globalFluorescenceArr = ["Very Strong", "Strong", "Medium", "Slight", "Very Slight", "None"];

// set minimum, maximum and step values for depth in depth slider
var globalDepthObj = {'min': 45.0, 'max': 80.0, 'step': 0.5};

// set minimum, maximum and step values for table in table slider
var globalTableObj = {'min': 50, 'max': 83, 'step': 0.5};

//array to map url shape value with database shape value
var shapeObj = {'round': 1, 'princess': 2, 'emerald': 3, 'asscher': 4, 'marquise': 5, 'oval': 6, 'cushion': 7, 'pear': 8, 'heart': 9, 'radiant': 10}

//object to convert database value to a known value for html view
var databaseToHtml = {"ideal": "Ideal", "excellent": "Excellent", "v-good": "Very Good", "good": "Good", "v-strong": "Very Strong", "strong": "Strong", "medium": "Medium", "v-slight": "Very Slight", "faint": "Faint", "none": "None"};

//object to hole value for total number of data for Pagination
var globalPaginationLimit = 10;

var globalSidestoneObj = {'SidestoneMinCarat': 45, 'SidestoneMaxCarat': 55}

//slider1Array for Price slider=>show the values
slider1Arr = [];
for (var i = globalPriceObj.min; i <= globalPriceObj.max; i += 25) {
  if (i <= 1000)
    slider1Arr.push(i); //step=25
  else if (i > 1000 && i <= 3000) {
    i += 75; //step=100
    slider1Arr.push(i);
  } else if (i > 3000 && i <= 15000) {
    i += 175; //step=200
    slider1Arr.push(i);
  } else if (i > 15000 && i <= 25000) {
    i += 475; //step=500
    slider1Arr.push(i);
  } else if (i > 25000 && i <= 40000) {
    i += 975; //step=1000
    slider1Arr.push(i);
  } else if (i > 40000 && i <= 100000) {
    i += 4975; //step=5000
    slider1Arr.push(i);
  } else if (i > 10000 && i <= 500000) {
    i += 24975; //step=25000
    slider1Arr.push(i);
  }
}

//slider2Array for Carat slider=>show the values
slider2Arr = [];
var caratMaxTemp = (globalCaratObj.max % .25 == 0) ? globalCaratObj.max : globalCaratObj.max - (globalCaratObj.max % .25);
for (var i = globalCaratObj.min; i < caratMaxTemp; i += .01) {
  i = parseFloat(i.toFixed(2));
  if (i <= 2.0)
    slider2Arr.push(i);//less than 2.00, step is .01
  else {//greater than 2.00, step is .25
    i += .24;
    slider2Arr.push(i);
  }
}
if (globalCaratObj.max % .25 != 0) {
  slider2Arr.push(globalCaratObj.max);
}

// most commonly searched diamond parameters
var commonShapes = ['round'];
var commonPriceRange = {'from': 500, 'to': 25000};
var commonCaratRange = {'from': .70, 'to': 1.29};
var commonColourRange = {'from': 'D', 'to': 'G'};
var commonClarityRange = {'from': 'VS2', 'to': 'SI1'};
var commonCutRange = {'from': 'Ideal', 'to': 'Excellent'};
var commonPolishRange = ['Excellent'];
var commonSymmetryRange = ['Excellent', 'Very Good'];
var commonFluorescenceRange = ['None'];
var commonDepthRange = {'from': 45, 'to': 80};
var commonTableRange = {'from': 50, 'to': 83};

//setting variable lables and fields needed mainly for custom product summary page
var settingMetal = {
  "WG18": {"label": "18ct White Gold", "field": "is_wg18"},
  "YG18": {"label": "18ct Yellow Gold", "field": "is_yg18"},
  "PL": {"label": "Platinum", "field": "is_pl"},
  "RG18": {"label": "18ct Rose Gold", "field": "is_rg18"}
};

//variable to hold wishlist item removal string
var globalConfirmWishlistItemRemove = "Are you sure you want to delete this item from wishlist? This action cannot be undone.";

//variable to hold wishlist removal string
var globalConfirmWishlistRemove = "Are you sure you want to delete the selected wish list(s)? This action cannot be undone.";

//variable to hold wishlist removal string
var globalSelectAWishListToDelete = "Please choose at least one wish list to delete.";

//varibale for selected metal type on first time page load
var globalMetalType = "WG18";

//object to hold confirmation values for different pages
var globalConfirmationObject = {
  "RemoveDiamond": "Are you sure want to remove the selected diamond? This cannot be undone.",
  "RemoveSetting": "Are you sure want to remove the selected setting? This cannot be undone.",
  "IncompatibleDiamondWithSetting": "The selected centre stone is not compatible with the setting and so it will delete your selected setting. Would you like to proceed?",
  "RemoveSidestones": "Are you sure want to remove the selected sidestones? This cannot be undone.",
  "RemoveDiamondFromShortlistedList": "Are you sure you want to remove this diamond from this list?",
  "EarringChangeSidestonesShape": "Are you sure want to change shape? It will reset your selected sidestones too.",
  "DiamondChangeShape": "Are you sure want to change shape? It will reset your selected diamond too.",
  "IncompatibleSettingWithDiamond": "The selected setting does not require any centre stone and so it will delete all the selected diamonds. Would you like to proceed?",
  "IncompatibleSetting": "The selected setting is different from exisitng setting and will delete your existing setting and its associated items. Would you like to proceed?",
  "RemoveItemFromCart" : "Are you sure you want to remove this item from your cart?",
  "SettingChangeShape": "This shape diamond does not fit the setting you have selected. Are you sure want to change shape? It will reset your selected setting too",
  "SelectLooseDiamond": "Are you sure want to select loose diamond?",
  "SelectLooseDiamondWithSettingAndDiamond": "Are you sure want to select loose diamond? This will clear your selected setting and diamond.",
  "SelectLooseDiamondWithSetting": "Are you sure want to select loose diamond? This will clear your selected setting.",
  "SelectLooseDiamondWithDiamond": "Are you sure want to select loose diamond? This will clear your selected diamond.",
  "BuyLooseDiamondWithSettingAndDiamond": "Are you sure want to buy loose diamond? This will clear your selected setting and diamond.",
  "BuyLooseDiamondWithSetting": "Are you sure want to buy loose diamond? This will clear your selected setting.",
  "BuyLooseDiamondWithDiamond": "Are you sure want to buy loose diamond? This will clear your selected diamond.",
  "ConfirmRemoveGiftWrapping" : "Are you sure you want to remove the engraving message from this item?"  
};

var globalURLObject = {
  "DiamondsURL": "/choose-a-diamond",
  "SidestonesURL": "/choose-your-sidestones",
  "RingURL": "/engagement-rings/build-your-own-ring/",
  "EarringURL": "/earrings/build-your-own-earring/",
  "PendantURL": "/pendants/build-your-own-pendant/",
  "CustomProductURL": "/custom-product-summary",
  "SettingsURL": "/choose-a-setting",
  "LooseDiamondsURL": "/diamonds/"
};
//object for setting type on first time page load
var globalMetalObj = {"WG18": "18ct White Gold", "YG18": "18ct Yellow Gold", "PL": "Platinum", "RG18": "18ct Rose Gold", "WG9": "9ct White Gold", "YG9": "9ct Yellow Gold", "TT9": "9ct Two Tone", "TT18": "18ct Two Tone",};
var globalMetalObjRev = {"18ct White Gold": "WG18", "18ct Yellow Gold": "YG18", "Platinum": "PL", "18ct Rose Gold": "RG18", "9ct White Gold": "WG9" , "9ct Yellow Gold": "YG9" , "9ct Two Tone": "TT9", "18ct Two Tone": "TT18" ,};

var defaultFingerSize = 90;

var globalText = {
  "RingCreateText"               : "CREATE A BESPOKE ENGAGEMENT RING",
  "RingButtonText"               : "COMPLETE MY RING",
  "RingChooseText"               : "CHOOSE YOUR SIDESTONES",
  "RingOtherText"                : "Your sidestones should support and enhance the beauty of your center stone.",
  "EarringCreateText"            : "CREATE YOUR CUSTOM EARRING",
  "EarRingButtonText"            : "COMPLETE MY EARRING",
  "EarringChooseText"            : "CHOOSE YOUR DIAMOND PAIR",
  "EarringOtherText"             : "",
  "LowerPanelCustomEarring"      : "Your Custom Earrring",
  "LowerPanelEarringButon"       : "View My Earring",
  "LowerPanelEarringDiamondPair" : "Select Diamond Pair",
  "LowerPanelDiamondPair"        : "Diamond Pair",
  "PendantHeading"               : "DESIGN A BESPOKE PENDANT",
  "LowerPanelCustomPendant"      : "Your Custom Pendant",
  "LowerPanelPendantButton"      : "View My Pendant",
  "ProductSummaryRingButton"     : "ADD MY RING TO CART",
  "ProductSummaryEarringButton"  : "ADD MY EARRING TO CART",
  "ProductSummaryPendantButton"  : "ADD MY PENDANT TO CART",
  "ProductDetailsRingInCart"     : "This custom ring is already allocated. If the ring is already in your shopping cart, the finger size can be updated from the cart.",
  "ProductDetailsPendantInCart"  : "The custom pendant is already allocated.",
  "ProductDetailsEarringInCart"  : "The custom earring is already allocated.",
  "ProductDetailsDiamondInCart"  : "The loose diamond is already allocated.",
  "ProductDetailsRingUnavailable" : "Custom ring is no longer available",
  "ProductDetailsPendantUnavailable" : "Custom pendant is no longer available",
  "ProductDetailsEarringUnavailable" : "Custom earring is no longer available",
  "ProductDetailsDiamondUnavailable" : "The loose diamond is no longer available",
  "EngravingMessageApplied"      : "Engraving message has been applied to the selected items in your cart successfully.",
  "EngravingMessageRemoved"      : "The selected item(s) in your cart will no longer be engraved.",
  "AutoSidestonesSelected"       : "Your side stones have been automatically selected to match the quality of your centre stone",
  "NoSidestones"                 : "Please contact us and a Diamond Exchange consultant will be able to help with the selection of side stones."
};

var globalAlert = {
  "ProductSummaryNoFingerSize": "Please select a ring size"
};

var globalImage = {
  "DefaultProductImage": "/template/images/ProductDefault.gif"
};

//variable used for storing Product images in product details page
var TypeThumbURLs = {"WG9" : {"rel" : [], "img" : []}, "WG18" : {"rel" : [], "img" : []}, "YG9" : {"rel" : [], "img" : []}, "YG18" : {"rel" : [], "img" : []}, "PL" : {"rel" : [], "img" : []}, "RG18" : {"rel" : [], "img" : []}, "TT9" : {"rel" : [], "img" : []}, "TT18" : {"rel" : [], "img" : []} };

var customProductSummaryPageSetting = {
  "CurrentProdThumbImage": 0,
  "ShowVariationThumb": false,
  "ProductThumbWidth": 500,
  "ProductThumbHeight": 750,
  "ProductMaxZoomWidth": 1280,
  "ProductMaxZoomHeight": 1280,
  "ProductTinyWidth": 60,
  "ProductTinyHeight": 90,
  "ShowImageZoomer": 1,
}

var CustomDesignPage = {
    "ValidExtention" : ["jpg","jpeg","gif"],
				"ValidImageSize" : 2 * 1024 * 1024
  }

var EngravingValue = 4;

var DiamondDetails = {
  "shippingBuffer": 21,
  "imageExtention" : ["jpg", "png", "gif", "jpeg"],
  "color": {
    "d": "Colourless. Be captivated by a D coloured diamond, the most perfect of all. Completely colourless, these spectacular diamonds are the highest grade in diamonds. Similar in tint to a bright white, diamonds of this quality are extremely rare and a diamond you will treasure forever.",
    "e": "Colourless. The second most impressive grade, the E coloured diamond offers the magical sparkle of a high quality diamond that is completely colourless to the naked eye and close to white. Only a trained gemmologist can detect the colour, but you'll simply see its remarkable beauty. ",
    "f": "Colourless. The F grade of colour may sit at the bottom of the colourless grade, but it simply cannot be detected by the unaided eye. They will look stunning on your white gold, gold or platinum engagement ring. Along with G it is the most popular colour grade.",
    "g": "Near Colourless. It's not surprising the G grade is one of the most popular diamonds for those looking for an exquisite diamond that offers both beauty and value. Colour can only be detected by a trained gemologist, but the sparkle of this precious gemstone will look spectacular in a white gold or gold setting.",
    "h": "Near Colourless. H Grade diamonds are dazzling, near colourless stones that have some colour but only evident to a genuine gemmologist and certainly not to the naked eye. This elegant grade will create an elegant match with your choice of white gold or gold setting.",
    "i": "Near Colourless. While not completely colourless and slightly detectable to the naked eye, I colour diamonds offer value for money that can be as dazzling as the diamond itself. A shrewd choice, these unique diamonds are a perfect fit for a stunning gold or rose gold setting.",
    "j": "Near colourless. J colour diamonds are a stunningly smart selection and often better value than than higher grades. These near colourless diamonds remain undetectable to the untrained eye but their sparkle will look quite spectacular matched to yellow or rose gold.",
		
		//K-M Same text
		"k": "K-M This level of diamond has noticeable colour that is detectable to the naked eye. (*Diamond Exchange do not stock)",
		"l": "K-M This level of diamond has noticeable colour that is detectable to the naked eye. (*Diamond Exchange do not stock)",
		"m": "K-M This level of diamond has noticeable colour that is detectable to the naked eye. (*Diamond Exchange do not stock)",
		
		//N-Z Same text
		"n": "N-Z The poorest level of colour grade being strong, easily detectable colour. (*Diamond Exchange do not stock)",
		"o": "N-Z The poorest level of colour grade being strong, easily detectable colour. (*Diamond Exchange do not stock)",
		"p": "N-Z The poorest level of colour grade being strong, easily detectable colour. (*Diamond Exchange do not stock)",
		"q": "N-Z The poorest level of colour grade being strong, easily detectable colour. (*Diamond Exchange do not stock)",
		"r": "N-Z The poorest level of colour grade being strong, easily detectable colour. (*Diamond Exchange do not stock)",
		"s": "N-Z The poorest level of colour grade being strong, easily detectable colour. (*Diamond Exchange do not stock)",
		"t": "N-Z The poorest level of colour grade being strong, easily detectable colour. (*Diamond Exchange do not stock)",
		"u": "N-Z The poorest level of colour grade being strong, easily detectable colour. (*Diamond Exchange do not stock)",
		"v": "N-Z The poorest level of colour grade being strong, easily detectable colour. (*Diamond Exchange do not stock)",
		"w": "N-Z The poorest level of colour grade being strong, easily detectable colour. (*Diamond Exchange do not stock)",
		"x": "N-Z The poorest level of colour grade being strong, easily detectable colour. (*Diamond Exchange do not stock)",
		"y": "N-Z The poorest level of colour grade being strong, easily detectable colour. (*Diamond Exchange do not stock)",
		"z": "N-Z The poorest level of colour grade being strong, easily detectable colour. (*Diamond Exchange do not stock)"
		
  },
  "cut": {
    "ideal": "The ideal cut diamond is a rare cut with excellent symmetry where all light that enters the diamond is reflected from the top to ensure the highest brilliance. A diamond cut that will dazzle for a lifetime.",
    "excellent": "This superb cut is the second highest cut standard available. Nearly all light in this exquisite cut is reflected from the top of the diamond for a brilliant result.",
    "very good": "While not considered perfect in cut, it could be just the perfect diamond for you. There is minimal difference to the leading grades with most light still reflected from the top producing a brilliant diamond.",
    "good": "While the sparkle may not be as dramatic as the top grades, diamonds at this level can be a wise choice. Spend more budget on diamond carat weight for a bigger, more dazzling diamond.",
  	"fair": "Imperfectly cut diamonds that lose light and are noticeably duller. (*Not stocked by Diamond Exchanged)",
		"poor": "These diamonds are either cut too shallow or deep and lose their light. (*Not stocked by Diamond Exchange)"
	},
  "clarity": {
    "fl": "Flawless - As the name suggests these diamond are literally flawless with no inclusions internally or externally. They are celebrate your love for a lifetime.",
    "if": "Internally Flawless - Superb diamonds with no internal flaws and possible surface blemishes. This clarity grade is very rare and highly valuable to seal your life together.",
    "vvs1": "Very, Very Slightly Included VVSI - A very, very fine choice. High quality with some minute imperfections not visible to the unaided eye and just visible at 10x magnification.",
    "vvs2": "Very, Very Slightly Included VVS2 - A beautiful diamond for your perfect engagement ring. There's slightly more significant inclusions than a VVSI grade, but still hidden to the untrained eye.",
    "vs1": "Very Slightly Included VSI: A stunning diamond that's less expensive to suit your budget. Very good quality with any imperfections still unable to be seen by the untrained person.",
    "vs2": "Very Slightly Included VSI2 - Another gorgeous diamond at exceptional value. More inclusions than VSI, but invisible to the naked eye, this is one of the leading clarity grades.",
    "si1": "Slightly included SI1 - Highly sought after for beauty and value, flaws are only visible under light magnification, but not the naked eye. All you will see is a magical diamond.",
    "si2": "Slightly Included SI2 - Inclusions at this level of clarity can be seen under slight magnification but S1 diamonds still give you the best value diamond to last forever.",
		"l1": "Included I1 - Lesser quality diamonds with obvious imperfections under 10x magnification. Depending on specific inclusions, the durability can be compromised. (*Diamond Exchange do not stock)",
		"l2": "Included I2 - The lowest clarity grade where imperfections can be seen clearly within the diamond and on the surface. (*Diamond Exchange do not stock)"
  },
  "shape": {
    1: "With almost 100 years of research going into optimising its fire and brilliance, the round brilliant cut is the most popular shape today. For premium brilliance we recommend you choose your round brilliant cut diamond in Ideal, Excellent and Very Good.",
    2: "Highlighted by pointed corners and traditionally square, the princess cut's unique shape makes it a favourite for engagement rings. With colours more noticeable in the corners where facets join together, we recommend you select your princess cut diamond with a colour grade between D to H.",
    3: "Strikingly beautiful with long, clean lines, the emerald cut diamond is an elegant alternative to the more traditional cuts. Its pavilion (bottom) is cut with rectangular facets, creating broader flashes of brilliance rather than fiery sparkles of light.",
    4: "Almost identical to the emerald cut diamond, except the Asscher cut diamond is square. Its pavilion (bottom) is cut with rectangular facets, creating broad flashes of brilliance and it's crown (top) has an open table, making colour/cut flaws and inclusions more visible to the naked eye.",
    5: "Beautifully dramatic through its length and pointed ends, the Marquise shape maximises carat weight, giving the impression of a much larger diamond. A variation of the round brilliant cut, it appears the better the cut, the more brilliant the diamond.",
    6: "A beautiful cut, the oval shape diamond is becoming a popular choice because its length can accentuate long, slender fingers. For the most brilliance, we recommend the three top cut grades � Ideal, Excellent and Very Good.",
    7: "Popular for over a century, cushion cut diamonds are cut with larger facets, increasing their brilliance and highlighting the diamond's clarity. For the most brilliance, we recommend the three top cut grades � Ideal, Excellent and Very Good.",
		8: "An eye-catching cut, the pear shape diamond is also known as the 'teardrop'; because of its one rounded end and other pointed end. Its unique shape makes it a popular choice for engagement rings and it's length creates a subtle slimming effect on your finger.",
    9: "Fall in love with the most romantic shape for a diamond. The heart shape diamond traditionally serves as the ultimate symbol of love and is a popular choice for engagement rings.",
    10: "The versatile radiant cut diamond blends the beauty and brilliance of a princess cut and the squarish shape of an emerald cut to make a truly unique and brilliant cut. The striking oval shape is becoming a popular choice with its length accentuating long, slender fingers."
  }
};

var sideStone = {
  "maxWeight": {
    "sameShape": 0.6,
    "pearShape": 0.6
  }, 
	 "shape": {
    "sameShape": {
      "skus": ["BH02", "DEX111", "DEX112", "DEX113", "DEX114", "DEX115", "DEX116", "DEX117", "DEX118", "DEX119","DEX120", "DEX338", "DEX339", "DEX340", "DEX341", "DEX342"],
      "range": {
        "BH02":{
          "0.30-0.349" : {"carat":0.15, "price":756},
          "0.35-0.399" : {"carat":0.18, "price":914},
          "0.40-0.449" : {"carat":0.20, "price":1204},
          "0.45-0.499" : {"carat":0.23, "price":1351},
          "0.50-0.549" : {"carat":0.25, "price":1813},
          "0.55-0.599" : {"carat":0.28, "price":1997}
        },
        "DEX111":{
          "0.30-0.349" : {"carat":0.15, "price":756},
          "0.35-0.399" : {"carat":0.18, "price":914},
          "0.40-0.449" : {"carat":0.20, "price":1204},
          "0.45-0.499" : {"carat":0.23, "price":1351},
          "0.50-0.549" : {"carat":0.25, "price":1813},
          "0.55-0.599" : {"carat":0.28, "price":1997}
        },
        "DEX112":{
          "0.30-0.349" : {"carat":0.15, "price":756},
          "0.35-0.399" : {"carat":0.18, "price":970},
          "0.40-0.449" : {"carat":0.20, "price":1056},
          "0.45-0.499" : {"carat":0.23, "price":1186},
          "0.50-0.549" : {"carat":0.25, "price":1272},
          "0.55-0.599" : {"carat":0.28, "price":1401}
        },
        "DEX113":{
          "0.30-0.349" : {"carat":0.15, "price":756},
          "0.35-0.399" : {"carat":0.18, "price":970},
          "0.40-0.449" : {"carat":0.20, "price":1056},
          "0.45-0.499" : {"carat":0.23, "price":1186},
          "0.50-0.549" : {"carat":0.25, "price":1272},
          "0.55-0.599" : {"carat":0.28, "price":1401}
        },
        "DEX114":{
          "0.30-0.349" : {"carat":0.15, "price":756},
          "0.35-0.399" : {"carat":0.18, "price":914},
          "0.40-0.449" : {"carat":0.20, "price":1204},
          "0.45-0.499" : {"carat":0.23, "price":1351},
          "0.50-0.549" : {"carat":0.25, "price":1813},
          "0.55-0.599" : {"carat":0.28, "price":1997}
        },
        "DEX115":{
          "0.30-0.349" : {"carat":0.15, "price":756},
          "0.35-0.399" : {"carat":0.18, "price":970},
          "0.40-0.449" : {"carat":0.20, "price":1056},
          "0.45-0.499" : {"carat":0.23, "price":1186},
          "0.50-0.549" : {"carat":0.25, "price":1272},
          "0.55-0.599" : {"carat":0.28, "price":1401}
        },
        "DEX116":{
          "0.30-0.349" : {"carat":0.15, "price":756},
          "0.35-0.399" : {"carat":0.18, "price":970},
          "0.40-0.449" : {"carat":0.20, "price":1056},
          "0.45-0.499" : {"carat":0.23, "price":1186},
          "0.50-0.549" : {"carat":0.25, "price":1272},
          "0.55-0.599" : {"carat":0.28, "price":1401}
        },
        "DEX117":{
          "0.30-0.349" : {"carat":0.15, "price":756},
          "0.35-0.399" : {"carat":0.18, "price":970},
          "0.40-0.449" : {"carat":0.20, "price":1056},
          "0.45-0.499" : {"carat":0.23, "price":1186},
          "0.50-0.549" : {"carat":0.25, "price":1272},
          "0.55-0.599" : {"carat":0.28, "price":1401}
        },
        "DEX118":{
          "0.30-0.349" : {"carat":0.15, "price":756},
          "0.35-0.399" : {"carat":0.18, "price":970},
          "0.40-0.449" : {"carat":0.20, "price":1056},
          "0.45-0.499" : {"carat":0.23, "price":1186},
          "0.50-0.549" : {"carat":0.25, "price":1272},
          "0.55-0.599" : {"carat":0.28, "price":1401}
        },
        "DEX119":{
          "0.30-0.349" : {"carat":0.15, "price":983},
          "0.35-0.399" : {"carat":0.18, "price":1261},
          "0.40-0.449" : {"carat":0.20, "price":1373},
          "0.45-0.499" : {"carat":0.23, "price":1542},
          "0.50-0.549" : {"carat":0.25, "price":1654},
          "0.55-0.599" : {"carat":0.28, "price":1822}
        },
        "DEX120":{
          "0.30-0.349" : {"carat":0.15, "price":756},
          "0.35-0.399" : {"carat":0.18, "price":970},
          "0.40-0.449" : {"carat":0.20, "price":1056},
          "0.45-0.499" : {"carat":0.23, "price":1186},
          "0.50-0.549" : {"carat":0.25, "price":1272},
          "0.55-0.599" : {"carat":0.28, "price":1401}
        },
        "DEX338":{
          "0.30-0.349" : {"carat":0.15, "price":756},
          "0.35-0.399" : {"carat":0.18, "price":914},
          "0.40-0.449" : {"carat":0.20, "price":1204},
          "0.45-0.499" : {"carat":0.23, "price":1351},
          "0.50-0.549" : {"carat":0.25, "price":1813},
          "0.55-0.599" : {"carat":0.28, "price":1997}
        },
        "DEX339":{
          "0.30-0.349" : {"carat":0.15, "price":756},
          "0.35-0.399" : {"carat":0.18, "price":970},
          "0.40-0.449" : {"carat":0.20, "price":1056},
          "0.45-0.499" : {"carat":0.23, "price":1186},
          "0.50-0.549" : {"carat":0.25, "price":1272},
          "0.55-0.599" : {"carat":0.28, "price":1401}
        },
        "DEX340":{
          "0.30-0.349" : {"carat":0.15, "price":756},
          "0.35-0.399" : {"carat":0.18, "price":970},
          "0.40-0.449" : {"carat":0.20, "price":1056},
          "0.45-0.499" : {"carat":0.23, "price":1186},
          "0.50-0.549" : {"carat":0.25, "price":1272},
          "0.55-0.599" : {"carat":0.28, "price":1401}
        },
        "DEX341":{
          "0.30-0.349" : {"carat":0.15, "price":983},
          "0.35-0.399" : {"carat":0.18, "price":1261},
          "0.40-0.449" : {"carat":0.20, "price":1373},
          "0.45-0.499" : {"carat":0.23, "price":1542},
          "0.50-0.549" : {"carat":0.25, "price":1654},
          "0.55-0.599" : {"carat":0.28, "price":1822}
        },
        "DEX342":{
          "0.30-0.349" : {"carat":0.15, "price":756},
          "0.35-0.399" : {"carat":0.18, "price":970},
          "0.40-0.449" : {"carat":0.20, "price":1056},
          "0.45-0.499" : {"carat":0.23, "price":1186},
          "0.50-0.549" : {"carat":0.25, "price":1272},
          "0.55-0.599" : {"carat":0.28, "price":1401}
        }
      }
    },
    "pearShape": {
      "skus": ["DEX121", "DEX122", "DEX123", "DEX124", "DEX125", "DEX126", "DEX127", "DEX128"],
      "range": {
        "0.30-0.349" : {"carat":0.15, "price":756},
        "0.35-0.399" : {"carat":0.18, "price":970},
        "0.40-0.449" : {"carat":0.20, "price":1056},
        "0.45-0.499" : {"carat":0.23, "price":1186},
        "0.50-0.549" : {"carat":0.25, "price":1272},
        "0.55-0.599" : {"carat":0.28, "price":1401}
      }
    }
  }
};