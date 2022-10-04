import React, { Component } from 'react';
import formsImg from './../assets/forms-img.webp';

export default class Forms extends Component {
  render(): JSX.Element {
    return (
      <div className="container my-24 px-6 mx-auto">
        {/* <!-- Section: Design Block --> */}
        <section className="mb-32 text-gray-800">
          {/* <!-- Jumbotron --> */}
          <div className="container mx-auto xl:px-32 text-center lg:text-left">
            <div className="grid lg:grid-cols-2 items-center">
              <div className="mb-12 lg:mb-0">
                <div className="jumbotron-forms block rounded-lg shadow-lg px-6 py-12 lg:py-6 xl:py-12 md:px-12 lg:-mr-14">
                  <h3 className="text-2xl font-bold mb-3">We know how valuable your time is</h3>
                  <h5 className="text-lg text-blue-600 font-bold mb-12 lg:mb-10 xl:mb-12">
                    Let us answer your questions
                  </h5>

                  <p className="font-bold mb-4">Anim pariatur cliche reprehenderit?</p>
                  <p className="text-gra-500 mb-6">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt autem numquam
                    dolore molestias aperiam culpa alias veritatis architecto eos, molestiae vitae
                    ex eligendi libero eveniet dolorem, doloremque rem aliquid perferendis.
                  </p>

                  <p className="font-bold mb-4">Non cupidatat skateboard dolor brunch?</p>
                  <p className="text-gra-500 mb-6">
                    Distinctio corporis, iure facere ducimus quos consectetur ipsa ut magnam autem
                    doloremque ex! Id, sequi. Voluptatum magnam sed fugit iusto minus et suscipit?
                    Minima sunt at nulla tenetur, numquam unde quod modi magnam ab deserunt ipsam
                    sint aliquid dolores libero repellendus cupiditate mollitia quidem dolorem odit
                  </p>

                  <p className="font-bold mb-4">
                    Praesentium voluptatibus temporibus consequatur non aspernatur?
                  </p>
                  <p className="text-gra-500">
                    Minima sunt at nulla tenetur, numquam unde quod modi magnam ab deserunt ipsam
                    sint aliquid dolores libero repellendus cupiditate mollitia quidem dolorem.
                  </p>
                </div>
              </div>

              <div>
                <img src={formsImg} className="w-full rounded-lg shadow-lg" alt="" />
              </div>
            </div>
          </div>
          {/* <!-- Jumbotron --> */}
        </section>
        {/* <!-- Section: Design Block --> */}
      </div>
    );
  }
}
